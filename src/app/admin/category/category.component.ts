import { Component, OnInit } from '@angular/core';
import { NzTableFilterList } from 'ng-zorro-antd/table';
import { AdminService } from 'src/app/admin/admin.service';
import { SubCategory, Category } from 'src/app/component/uploadcoupons/uploadcoupons.component';
import { UploadcouponsService } from 'src/app/component/uploadcoupons/uploadcoupons.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

export class SubCategoryDTO {
  categoryId: number = 0;
  categoryName: string = '';
  subCategoryId: number = 0;
  subCategoryName: string = '';
  subCategoryVisibility: Boolean = true;
  categoryVisibility: Boolean = true;
  isSubCategoryDeleted: Boolean = false;
  iscategoryDeleted: Boolean = false;
  mandatoryComplimentary: Boolean = true;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private modal: NzModalService, private uploadcouponsService: UploadcouponsService, private msg: NzMessageService, private adminServie: AdminService) {


  }

  sortCId = (a: SubCategory, b: SubCategory) => a.category.id - b.category.id;
  sortCName = (a: SubCategory, b: SubCategory) => a.category.categoryName.localeCompare(b.category.categoryName);
  sortSCId = (a: SubCategory, b: SubCategory) => a.id - b.id;
  sortSCName = (a: SubCategory, b: SubCategory) => a.subCategoryName.localeCompare(b.subCategoryName);
  previewCategoryVisible = false;
  categorySelected: string[] = [];
  previewSubCategoryVisible = false;
  category: string = '';
  subCategory: string = '';
  categories: Category[] = [];
  editVisible = false;
  editField: string = '';
  editValue: string = '';
  editId: number = 0;

  mandatoryComplimentaryChange(editId: number)
  {
    this.loading = true;
    var formData = new FormData();
    formData.set("subCategoryId", editId + "");
    this.adminServie.mandatoryComplimentaryChange(formData).subscribe(
      (res) => { console.log(res); this.loading = false; if (res) { this.msg.create('success', 'Sub-Category Complimentary Mandatory Changed.'); this.ngOnInit(); } },
      (err) => { console.log(err); this.loading = false; this.msg.create('error', 'Error Occured while Changing Sub-Category Complimentary Mandatory'); }
    );
  }

  callfun(test: any) {

    let filterSC = this.subCategories.filter(o => test.includes(o.categoryName)).map(o => o.subCategoryName);

    console.log(filterSC);

    this.filterSubCategoryName = [];
    for (var i = 0; i < filterSC.length; i++) {
      this.filterSubCategoryName.push([{ text: filterSC[i], value: filterSC[i], byDefault: false }][0]);

    }

  }

  editFun() {
    if (this.editField === 'Category') {
      this.editCategory();
    }
    else if (this.editField === 'Sub-Category') {
      this.editSubCategory();
    }
  }



  categoryNameFilterFn = (list: string[], item: SubCategory) => {
    console.log("in category");


    return list.some(name => item.category.categoryName === name);

  }


  showConfirm(text: string, editId: number, editField: string): void {
    this.modal.confirm({
      nzTitle: 'Are you sure ' + text + ' this ' + editField + '?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        if (text === 'Delete') {
          if (editField === 'Category')
            this.deleteCategory(editId);
          else if (editField === 'Sub-Category')
            this.deleteSubCategory(editId);
        }
        else if (text === 'Hide' || text === 'UnHide') {
          if (editField === 'Category')
            this.visibleCategory(editId);
          else if (editField === 'Sub-Category')
            this.visibleSubCategory(editId);
        }
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });

  }


  subCategoryNameFilterFn = (list: string[], item: SubCategory) => {
    console.log("in sub category");



    return list.some(name => item.subCategoryName === name);
  }

  filterCategoryName: NzTableFilterList = [];
  filterSubCategoryName: NzTableFilterList = [];



  ngOnInit(): void {
    this.getAllSubCategories();
    this.getCategories();
  }
  subCategories: SubCategoryDTO[] = [];

  loading: boolean = false;

  getCategories() {
    this.loading = true;
    this.uploadcouponsService.getCategories().subscribe(

      (res) => { this.categories = res; this.loading = false; },
      (err) => { this.loading = false; }

    );
  }
  getAllSubCategories() {
    this.loading = true;

    this.adminServie.getAllSubCategories().subscribe(
      (res) => {
        console.log(res);

        this.subCategories = res;
        var set = new Set(this.subCategories.map(o => o.categoryName));
        let filters: string[] = Array.from(set);
        this.filterCategoryName = [];
        for (var i = 0; i < filters.length; i++) {
          this.filterCategoryName.push([{ text: filters[i], value: filters[i], byDefault: false }][0]);

        }
        set = new Set(this.subCategories.map(o => o.subCategoryName));
        filters = Array.from(set);
        this.filterSubCategoryName = [];
        for (var i = 0; i < filters.length; i++) {
          this.filterSubCategoryName.push([{ text: filters[i], value: filters[i], byDefault: false }][0]);

        }

        this.loading = false;

      },
      (err) => { console.log(err); this.loading = false; }
    );
  }
  addCategoryView() {
    this.category = '';
    this.subCategory = '';
    this.previewCategoryVisible = true;
  }

  addSubCategoryView() {
    this.category = '';
    this.subCategory = '';
    this.previewSubCategoryVisible = true;
  }

  deleteSubCategory(subCategoryId: number) {
    this.loading = true;
    var formData = new FormData();
    formData.set("subCategoryId", subCategoryId + "");
    this.adminServie.deleteSubCategory(formData).subscribe(
      (res) => { console.log(res); this.loading = false; if (res) { this.msg.create('success', 'Sub-Category Deleted.'); this.ngOnInit(); } },
      (err) => { console.log(err); this.loading = false; this.msg.create('error', 'Error Occured while Deleting Sub-Category'); }
    );
  }

  deleteCategory(categoryId: number) {
    this.loading = true;

    var formData = new FormData();
    formData.set("categoryId", categoryId + "");
    this.adminServie.deleteCategory(formData).subscribe(
      (res) => { console.log(res); this.loading = false; if (res) { this.msg.create('success', 'Category Deleted.'); this.ngOnInit(); } },
      (err) => { console.log(err); this.loading = false; this.msg.create('error', 'Error Occured while Deleting Category'); }
    );
  }

 visibleSubCategory(subCategoryId: number) {
    this.loading = true;
    var formData = new FormData();
    formData.set("subCategoryId", subCategoryId + "");
    this.adminServie.visibleSubCategory(formData).subscribe(
      (res) => { console.log(res); this.loading = false; if (res) { this.msg.create('success', 'Sub-Category Visibility Modified.'); this.ngOnInit();} },
      (err) => { console.log(err); this.loading = false; this.msg.create('error', 'Error Occured while modifing Visibility of Sub-Category'); }
    );
  }

  visibleCategory(categoryId: number) {
    this.loading = true;

    var formData = new FormData();
    formData.set("categoryId", categoryId + "");
    this.adminServie.visibleCategory(formData).subscribe(
      (res) => { console.log(res); this.loading = false; if (res) { this.msg.create('success', 'Category Visibility Modified.'); this.ngOnInit(); } },
      (err) => { console.log(err); this.loading = false; this.msg.create('error', 'Error Occured while modifing Visibility of Category'); }
    );
  }

  addCategory() {

    if (this.category.trim().length < 3) {
      this.msg.create("error", "Category Name should be minimum of 3 Characters");
      return;
    }

    this.loading = true;
    this.previewCategoryVisible = false;
    var formData = new FormData();
    formData.set("category", this.category);
    this.adminServie.addCategory(formData).subscribe(
      (res) => { console.log(res); this.loading = false; if (res) { this.msg.create('success', 'Category Created.'); this.ngOnInit(); } },
      (err) => { console.log(err); this.loading = false; this.msg.create('error', 'Error Occured while creating Category'); }
    )
  }
  addSubCategory() {
    if (this.category == null || this.category == '' || this.category == undefined) {
      this.msg.create("error", "Please Select Category Name");
      return;
    }
    if (this.subCategory.trim().length < 3) {
      this.msg.create("error", "Sub-Category Name should be minimum of 3 Characters");
      return;
    }

    this.loading = true;
    this.previewSubCategoryVisible = false;
    var formData = new FormData();
    formData.set("categoryId", this.category);
    formData.set("subcategory", this.subCategory);
    this.adminServie.addSubCategory(formData).subscribe(
      (res) => {
        console.log(res); this.loading = false;
        if (res) {
          this.msg.create('success', 'Sub-Category Created.'); this.ngOnInit();
        }
        else {
          this.msg.create('error', 'Cannot Create Sub-Category ' + this.subCategory); this.ngOnInit();
        }

      },
      (err) => { console.log(err); this.loading = false; this.msg.create('error', 'Error Occured while creating Sub-Category'); }
    )
  }


  editCategory() {
    this.loading = true;
    var formData = new FormData();
    formData.set("categoryId", this.editId + "");
    formData.set("categoryName", this.editValue);
    this.editVisible = false;
    this.adminServie.editCategory(formData).subscribe(

      (res) => {
        console.log(res); this.loading = false;

        if (res) {
          this.msg.create('success', 'Category Edited Successfully.'); this.ngOnInit();
        }
        else {
          this.msg.create('error', 'Cannot Edit Category ' + this.editValue); this.ngOnInit();
        }

      },
      (err) => { console.log(err); this.loading = false; this.msg.create('error', 'Error Occured while editing Category'); }

    );
  }

  editSubCategory() {
    this.loading = true;
    var formData = new FormData();
    formData.set("subCategoryId", this.editId + "");
    formData.set("subCategoryName", this.editValue);
    this.editVisible = false;
    this.adminServie.editSubCategory(formData).subscribe(

      (res) => {
        console.log(res); this.loading = false;

        if (res) {
          this.msg.create('success', 'Sub-Category Edited Successfully.'); this.ngOnInit();
        }
        else {
          this.msg.create('error', 'Cannot Edit Sub-Category ' + this.editValue); this.ngOnInit();
        }

      },
      (err) => { console.log(err); this.loading = false; this.msg.create('error', 'Error Occured while editing Sub-Category'); }

    );
  }

  

}
