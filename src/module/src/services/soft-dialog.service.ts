import { SoftDialogContainerComponent } from './../controls/soft-dialog/soft-dialog-container.component';
import { SoftDialogRef } from './soft-dialog-ref';
import { SoftContentRef } from './../models/soft-content-ref';
import { SoftBackDropComponent } from './../controls/soft-dialog/soft-back-drop.component';
import {
  Injectable, RendererFactory2, Renderer2, ComponentFactoryResolver, Injector,
  ApplicationRef,
  ReflectiveInjector,
  TemplateRef,
  Provider,
  ComponentRef,
} from '@angular/core';

@Injectable()
export class SoftDialogService {
  private dialogs: SoftContentRef[];
  private renderer: Renderer2;
  private backdropComponentRef: ComponentRef<any>;
  private baseZIndex = 2000;
  private globalListener: Function;
  constructor(
    renderFactory: RendererFactory2,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _injector: Injector,
    private _applicationRef: ApplicationRef,
  ) {
    this.renderer = renderFactory.createRenderer(null, null);
    this.dialogs = [];
  }

  show(content: string | TemplateRef<any> | any, data?: {
    initialState?: any,
    class?: string,
    styles?: any,
    backdrop?: boolean
  }): SoftDialogRef {
    if (this.dialogs.length === 0) {
      this._showBackdrop();
    }
    const styleObj = Object.assign({}, data && data.styles || {}, {
      position: 'fixed',
      'overflow-x': 'hidden',
      'overflow-y': 'auto',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      'z-index': this.dialogs.length + 1 + this.baseZIndex
    });
    const contentRef = this._getContentRef({
      content,
      initialState: data && data.initialState,
      class: data && data.class,
      styles: styleObj,
      backdrop: data && data.backdrop === false ? false : true
    });
    setTimeout(() => {
      this._showContent(contentRef);
    }, 0);
    return contentRef.dialogRef;
  }

  hide() {
    const contentRef = this.dialogs[this.dialogs.length - 1];
    if (contentRef) {
      contentRef.dialogRef.hide();
    }
  }

  /**
   * 显示内容
   * @param contentRef _getContentRef方法生成的ContentRef对象
   */
  private _showContent(contentRef: SoftContentRef) {
    contentRef.dialogRef.onBeforeShow.emit();

    this.dialogs.push(contentRef);
    contentRef.instance = contentRef.componentRef.instance;
    contentRef.instance.level = this.dialogs.length;
    this._applicationRef.attachView(contentRef.componentRef.hostView);
    document.querySelector('body').appendChild(contentRef.componentRef.location.nativeElement);
    contentRef.componentRef.changeDetectorRef.markForCheck();
    contentRef.componentRef.changeDetectorRef.detectChanges();

    contentRef.dialogRef.onAfterShow.emit();
  }

  private _getContentRef(option: {
    content: string | TemplateRef<any> | any,
    initialState?: any,
    class?: string,
    styles?: any,
    backdrop?: boolean
  }): SoftContentRef {
    if (!option.content) {
      return;
    }
    const compFactory = this._componentFactoryResolver.resolveComponentFactory(SoftDialogContainerComponent);
    const dialogRef: SoftDialogRef = new SoftDialogRef();
    const providers: Provider[] = [{
      provide: SoftDialogRef,
      useValue: dialogRef
    }];
    const nodes = this._getNodes(option.content, option.initialState, providers);
    const injector = ReflectiveInjector.resolveAndCreate(providers, this._injector);
    const componentRef = compFactory.create(injector, nodes);
    if (option.class) {
      // this.addClass(componentRef.location.nativeElement, option.class);
      componentRef.instance.className = option.class;
    }
    if (option.styles) {
      this.addStyles(componentRef.location.nativeElement, option.styles);
    }
    Object.assign(componentRef.instance, option.initialState || {});
    componentRef.instance.backdropClick = option.backdrop;
    const contentRef: SoftContentRef = new SoftContentRef(dialogRef, componentRef);
    dialogRef.hide = () => {
      dialogRef.onBeforeHide.emit();
      this._hideComponent(componentRef);
      dialogRef.onAfterHide.emit();
    };
    return contentRef;
  }

  private _hideComponent(componentRef: ComponentRef<any>) {
    if (componentRef) {
      let index = -1;
      for (let i = 0; i < this.dialogs.length; i++) {
        if (this.dialogs[i].componentRef === componentRef) {
          index = i;
          break;
        }
      }
      if (index < 0) {
        return;
      }
      this.dialogs.splice(index, 1);
      componentRef.instance.isShown = false;
      setTimeout(() => {
        const el = componentRef.location.nativeElement;
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        } else {
          document.querySelector('body').removeChild(el);
        }
        componentRef.destroy();
      }, 200);
    }
    if (this.dialogs.length === 0) {
      this._hideBackdrop();
      // this.unRegistryOutsideClick();
    }
    this._resetLeve();
  }

  private _resetLeve() {
    let i = 1;
    this.dialogs.forEach(d => {
      d.instance.level = i++;
    });
  }

  private addClass(el: any, className: string) {
    let classes = className.split(' ');
    classes.forEach(c => {
      this.renderer.removeClass(el, c);
    });
    className = className ? className.trim() : '';
    classes = className.split(' ');
    classes.forEach(c => {
      this.renderer.addClass(el, c);
    });
  }

  private addStyles(el: any, style: any) {
    for (const key in style) {
      this.renderer.setStyle(el, key, style[key]);
    }
  }

  private _showBackdrop() {
    const backdropFactory = this._componentFactoryResolver.resolveComponentFactory(SoftBackDropComponent);
    const nodes = this._getNodes(null);
    const injector = ReflectiveInjector.resolveAndCreate([], this._injector);
    const componentRef = backdropFactory.create(injector, nodes);
    this.addStyles(componentRef.location.nativeElement, {
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    });
    this._applicationRef.attachView(componentRef.hostView);
    document.querySelector('body').appendChild(componentRef.location.nativeElement);
    this.backdropComponentRef = componentRef;
  }
  private _hideBackdrop() {
    if (this.backdropComponentRef) {
      this.backdropComponentRef.instance.isShown = false;
      setTimeout(() => {
        const el = this.backdropComponentRef.location.nativeElement;
        el.parentNode.removeChild(el);
        this.backdropComponentRef.destroy();
        this.backdropComponentRef = null;
      }, 200);
    }
  }
  private _getNodes(content: string | TemplateRef<any> | any, initialState?: any, providers?: Provider[]): any[] {
    if (!content) {
      return [];
    }
    if (content instanceof TemplateRef) {
      const viewRef = content.createEmbeddedView(content);
      this._applicationRef.attachView(viewRef);
      return [viewRef.rootNodes];
    }

    if (typeof content === 'function') {
      const contentCmptFactory = this._componentFactoryResolver.resolveComponentFactory(content);
      const modalContentInjector = ReflectiveInjector.resolveAndCreate(
        providers || [],
        this._injector
      );
      const componentRef = contentCmptFactory.create(modalContentInjector);
      Object.assign(componentRef.instance, initialState);
      // this._applicationRef.attachView(componentRef.hostView);
      return [[componentRef.location.nativeElement]];
    }

    return [[this.renderer.createText(`${content}`)]];
  }
}
