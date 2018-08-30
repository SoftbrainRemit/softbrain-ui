import { HttpClient } from '@angular/common/http';
import { SoftFile } from './../../models/soft-file.interface';
import {
  Component, OnInit, Input, Output, EventEmitter, ContentChild,
  TemplateRef, ViewChild, ElementRef
} from '@angular/core';
import { Observable, Observer } from 'rxjs';
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'soft-upload',
  templateUrl: './soft-upload.component.html',
  styleUrls: ['./soft-upload.component.scss']
})
export class SoftUploadComponent implements OnInit {
  @ViewChild('file')
  fileElement: ElementRef;
  @Input()
  name: string;
  @Input()
  disabled: boolean;
  @Input()
  mode: 'stream' | 'base64' = 'stream';
  @Input()
  size: 'mini' | 'small' | 'default' | 'large' = 'default';
  @Input()
  uploadUrl: string;
  @Input()
  preview: boolean;
  @Input()
  btnLabel: string = 'Upload';
  @Input()
  showFiles: boolean;
  @Input()
  accept: string = '.jpg,.png,.bmp,.pdf';
  @Input()
  multiple: boolean;
  @Input()
  maxFileCount: number = 1;
  @Input()
  maxSize: number;
  @Input()
  beforeUpload: (f: SoftFile | SoftFile[]) => boolean;
  @Output()
  previewFile: EventEmitter<any> = new EventEmitter();
  @Output()
  remove: EventEmitter<any> = new EventEmitter();
  @Output()
  complete: EventEmitter<any> = new EventEmitter();
  @Output()
  uploaded: EventEmitter<any> = new EventEmitter();
  @Output()
  error: EventEmitter<any> = new EventEmitter();

  @ContentChild('trigger')
  triggerTemplate: TemplateRef<any>;
  @ContentChild('tip')
  tipTemplate: TemplateRef<any>;
  @Input()
  model: SoftFile[];
  @Output()
  modelChange: EventEmitter<any> = new EventEmitter();
  fileList: UploadFile[] = [];
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  selectFile() {
    if (!this.disabled) {
      this.fileElement.nativeElement.click();
    }
  }

  onFileChange(event) {
    const files = event.target.files;
    if (files && files.length > 0) {
      const handlers: Observable<UploadFile>[] = [];
      for (let i = 0; i < files.length; i++) {
        handlers.push(this.getFile(files[i]));
      }
      Observable.forkJoin(handlers).subscribe((values: UploadFile[]) => {
        this.addFiles(values);
        this.fileElement.nativeElement.value = '';
        if (this.model && this.model.length) {
          this.uploadFile();
        }
      });
    }
  }

  removeFile(f: UploadFile) {
    if (this.fileList && this.fileList.indexOf(f) >= 0) {
      this.fileList.splice(this.fileList.indexOf(f), 1);
      this.calcModel();
      this.remove.emit(f.file);
    }
  }

  onPreview(f: any) {
    this.previewFile.emit(f.file);
  }

  private uploadFile() {
    if (this.uploadUrl) {
      if (this.beforeUpload && !this.beforeUpload(this.model)) {
        return;
      }
      const body = new FormData();
      for (let i = 0; i < this.model.length; i++) {
        body.append('file' + i, this.model[i].file);
      }
      this.http.post(this.uploadUrl, body).subscribe((data) => {
        this.uploaded.emit(data);
      }, (err) => {
        this.error.emit(err);
      }, () => {
        this.complete.emit();
      });
    } else {
      this.complete.emit(!this.multiple ? this.model[0] : this.model);
    }
  }

  private checkFile(size, ext): boolean {
    let res = true;
    this.model = this.model || [];
    if (this.maxSize && size * 1024 > this.maxSize) {
      this.error.emit({
        code: 'OutofSize',
        data: size
      });
      res = false;
    }
    if (this.accept && this.accept.split(',').indexOf(ext) < 0) {
      this.error.emit({
        code: 'NotAllowFileType',
        data: ext
      });
      res = false;
    }
    return res;
  }

  private getFile(f: File): Observable<UploadFile> {
    return Observable.create((observer: Observer<UploadFile>) => {
      const ext = f.name.substring(f.name.lastIndexOf('.'));
      if (!this.checkFile(f.size, ext)) {
        observer.next(null);
        observer.complete();
        return;
      }

      const uploadFile: UploadFile = {
        file: {
          name: f.name,
          size: f.size,
          ext: ext
        },
        mime: f.type
      };
      if (this.mode === 'base64' || this.preview) {
        const fr = new FileReader();
        fr.onload = (e: ProgressEvent) => {
          const url = fr.result as string;
          uploadFile.file.file = this.mode === 'stream' ? f : url.substring(url.indexOf('base64,') + 7);
          uploadFile.url = url;
          observer.next(uploadFile);
          observer.complete();
        }
        fr.readAsDataURL(f);
      } else {
        uploadFile.file.file = f;
        observer.next(uploadFile);
        observer.complete();
      }
    });
  }

  private addFiles(files: UploadFile[]) {
    this.fileList = this.fileList || [];
    files = files.filter(f => f);
    this.fileList.push(...files);
    if (this.fileList.length > this.maxFileCount) {
      this.fileList.splice(0, this.fileList.length - this.maxFileCount);
    }
    this.calcModel();
  }

  private calcModel() {
    this.model = this.fileList.map(d => d.file);
    if (this.multiple) {
      this.modelChange.emit(this.model);
    } else {
      this.modelChange.emit(this.model[0]);
    }
  }
}

export interface UploadFile {
  file?: SoftFile;
  hover?: boolean;
  id?: number;
  url?: string;
  mime?: string;
};
