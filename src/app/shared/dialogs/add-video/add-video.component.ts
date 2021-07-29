import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import {
  CategoryMaster,
  CategoryRequestData,
} from 'src/app/core/data-models/category/game_category.model';
import { VideoRequestData } from 'src/app/core/data-models/videos/videos.model';
import { StoreService } from 'src/app/core/services/store-service/store.service';

@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.scss'],
})
export class AddVideoComponent implements OnInit {
  constructor(
    private spinnerService:NgxSpinnerService,
    public dialogRef: MatDialogRef<AddVideoComponent>,
    @Inject(MAT_DIALOG_DATA) public videoRequest:{video:VideoRequestData|undefined,categoryName:string|undefined},
    private storeService: StoreService
  ) {}
  allCategories$!: Observable<CategoryMaster | undefined>;

  videoID: string | false |undefined;

  formData!: FormGroup;

  ngOnInit(): void {
    this.spinnerService.hide()

    this.allCategories$ = this.storeService.getAllCategories$;
    this.storeService.loadAllCategories();
    this.formData = new FormGroup({
      video_url: new FormControl(null, [Validators.required]),
      video_title_en: new FormControl(null, [Validators.required]),
      video_title_hn: new FormControl(null, [Validators.required]),
      video_decription_en: new FormControl(null, [Validators.required]),

      video_decription_hn: new FormControl(null, [Validators.required]),

      category_details: new FormControl(null, []),
      category_master_id: new FormControl(null, [Validators.required]),
    });
    this.onVideoUrlChanged();
    this.listenForCategoryChange();
    if(this.videoRequest){
      if(this.videoRequest.video){
        this.videoID = this.youtube_parser(this.videoRequest.video.video_url!)
      }
      this.formData.patchValue({...this.videoRequest.video,category_details:{cat_display_name_en:this.videoRequest.categoryName}})
      if(this.videoRequest.video && !this.videoRequest.categoryName){
        this.formData.patchValue({category_details:{category_master_id:this.videoRequest.video.category_master_id}})
      }
    }
  }

  objectComparisonFunction = function (
    option: CategoryRequestData,
    value: CategoryRequestData
  ): boolean {
    if (option && value) {
      if(option.cat_display_name_en && value.cat_display_name_en){
        return option.cat_display_name_en === value.cat_display_name_en;
      }
      if(option.category_master_id && value.category_master_id){
        return option.category_master_id === value.category_master_id;
      }
    }
    return false;
  };

  youtube_parser(url: string) {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  }

  onVideoUrlChanged() {
    this.formData.get('video_url')?.valueChanges.subscribe((val) => {
      if (val) {
        const videoId = this.youtube_parser(val);
        if (videoId) {
          this.videoID = videoId;
        } else {
          this.videoID = undefined;
        }
      } else {
        this.videoID = undefined;
      }
    });
  }

  listenForCategoryChange(){
    this.formData.get('category_details')?.valueChanges.subscribe(val=>{
      if(val){
        const categorySelected = val as CategoryRequestData;
        this.formData.patchValue({category_master_id: categorySelected.category_master_id})
        if(!categorySelected.category_master_id){
          this.allCategories$.subscribe(val=>{
            if(val){
              const categ = val.videos.find(a=>a.cat_display_name_en===categorySelected.cat_display_name_en);
              if(categ){
                this.formData.patchValue({category_master_id: categ.category_master_id})

              }
            }
          })
        }
      }
    })
  }
  submitData() {
    delete this.formData.value['category_details'];
    this.spinnerService.show()
    this.dialogRef.close({
      status: true,
      data: {
        ...this.videoRequest.video,
        ...this.formData.value,
        image_thumbnail: `https://img.youtube.com/vi/${this.videoID}/0.jpg`,
      },
    });
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
