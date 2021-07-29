import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { FileSystemFileEntry, NgxFileDropEntry } from "ngx-file-drop";
import { ImageCropperComponent } from "ngx-image-cropper";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
@Component({
  selector: "app-image-upload",
  templateUrl: "./image-upload.component.html",
  styleUrls: ["./image-upload.component.scss"],
})
export class ImageUploadComponent implements OnInit {
  public zoomGallery = false;
  @Input() labelName: string|undefined;
  @Input() base64Image: string|undefined;
  @Input() design = false;
  @Input() disabled: boolean = false;
  @Input() isUrl: boolean|undefined = false;
  @Input() error: string|undefined;
  @Output() onImageChanged: EventEmitter<string> = new EventEmitter<string>();
  @Input() fileErrorMessage: string|undefined;
  constructor(
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}
  public dropped(files: NgxFileDropEntry[]) {
    if (files && files.length > 0) {
      const droppedFile = files[0];
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          const fileSize  = (file.size/(1024*1024))
          if(file.type.includes("image") && fileSize<=1.1){
            var reader = new FileReader();
            reader.onload =this._handleReaderLoaded.bind(this);
            if(!file.type.includes('image')){
              this.fileErrorMessage = "File Type not supported"
              this.invalidateFile()
            }else{
              reader.readAsBinaryString(file)
            }
          }else{
            if(fileSize>1){
              this.fileErrorMessage = 'Max Size Allowed - 1MB';
              
            }
            this.invalidateFile();
            
          }

        
        });
      }
    }
  }



  private _handleReaderLoaded(readerEvent:any){
    var binaryString = readerEvent.target.result;
    this.base64Image = btoa(binaryString);
    this.onImageChanged.emit(this.base64Image);
    this.fileErrorMessage = undefined;
  }
  invalidateFile() {
    this.base64Image = undefined;
    this.onImageChanged.emit(undefined);
    this.error = undefined;
  }

  lightbox() {
    this.zoomGallery = !this.zoomGallery;
  }
}
