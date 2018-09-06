<div style="position: relative;">
  <div [ngStyle]="{'transform': isCollapse ? 'translateX(0)' : 'translateX(280px)'}">
    <i class="fa fa-navicon fa-fw" style="cursor: pointer;" (click)="onCollapse()"></i>
  </div>
  <soft-menu [menus]="menus" [collapse]="isCollapse" [collapseShowIcon]="true"></soft-menu>
</div>