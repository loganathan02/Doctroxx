import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blank-layout',
  templateUrl: './blank-layout.component.html',
  styleUrls: ['./blank-layout.component.scss']
})
export class BlankLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

@Injectable({
  providedIn: 'root'
})

export class LocalStoreService {

  private ls = window.localStorage;
  constructor(private router: Router, private http: HttpClient, private toastr: ToastrService) { }


  public setItem(key, value) {
    value = JSON.stringify(value);
    this.ls.setItem(key, value);
    return true;
  }

  public getItem(key) {
    const value = this.ls.getItem(key);
    try {
      return JSON.parse(value);
    } catch (e) {
      // console.log(e)
      return null;
    }
  }
  public clear() {
    this.ls.clear();
  }


  create_supplier(formData, userType, login_clinic_id) {
    let clinic_id = localStorage.getItem('id');
    let companyid = localStorage.getItem("logincompanyid");
    console.log(" testing login clinic_id", login_clinic_id);



    return this.http.post<any>(`${environment.apiUrl}/supllier/addsupplier`, { formData: formData, userType: userType, login_clinic_id: login_clinic_id })
      .pipe(map(response => {
        return response;
      }));
  }

  get_supplier() {
    let login_clinic_id = localStorage.getItem('login_clinic_id');

    return this.http.get<any>(`${environment.apiUrl}/supllier/suppliers?login_clinic_id=${login_clinic_id}`)
      .pipe(map(responsedata => {
        return responsedata;
      }));

  }

  getvendor_byid(vendorid) {
    return this.http.get<any>(`${environment.apiUrl}/supllier/getsupplier_byId?vendorid=${vendorid}`)
      .pipe(map(responsedata => {
        console.log("dddddddddddd:", responsedata);
        return responsedata; // Return the response data if needed
      }));
  }

  editvendor_byid(vendorid, editvendorsdata) {
    console.log("checking data", editvendorsdata);
    return this.http.post<any>(`${environment.apiUrl}/supllier/editsupplier_byid`, {
      vendorid: vendorid, editvendorsdata: editvendorsdata
    }).pipe(map(responsedata => {
      if (responsedata.statusCode === 200) {
        // this.toastr.success('Updated successfully!', 'Success');
        this.toastr.success(' updated successfully!', 'Success', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          progressBar: true
        });
        // Refresh the page after the successful update
        // window.location.reload();
      } else {
        this.toastr.error('Failed to update supplier details', 'Error');
      }
      return responsedata;
    }));
  }


  get_clinic_all_supplier() {

    let login_clinic_id = localStorage.getItem('login_clinic_id');
    return this.http.get<any>(`${environment.apiUrl}/supllier/get_clinic_all_supplier?login_clinic_id=${login_clinic_id}`)
      .pipe(map(responsedata => {
        return responsedata;
      }));

  }

  addProduct(productList, amountBeforeTax, amountAfterTax, roundOffTotal, grandTotal, login_clinic_id) {
    return this.http.post<any>(`${environment.apiUrl}/product/addproduct`, { productList: productList, amountBeforeTax: amountBeforeTax, amountAfterTax: amountAfterTax, roundOffTotal: roundOffTotal, grandTotal: grandTotal, login_clinic_id: login_clinic_id })
      .pipe(map(response => {
        return response;
      }));
  }







}
