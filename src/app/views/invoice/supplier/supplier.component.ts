import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-supplier',
  // standalone: true,
  // imports: [FormsModule],
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.scss'
})

export class SupplierComponent  implements OnInit {
  ngOnInit(): void { 
    this.get_supplier();  
    this.login_clinic_id = localStorage.getItem("login_clinic_id");
    
  }

  constructor(
   
    private model : NgbModal,
    private LocalStoreService: LocalStoreService,
    private toastr: ToastrService,

  ) {


  }
  dialogref: any;
  userType: string = '';
  suppliers: any[] = []; 
  vendorid: any;
  editvendorsdata: any;
  dialogref1: any;
  datafor: any;
 login_clinic_id: string = '';


  
  
  createvendorpopup(vendorcreatepage) {

    this.dialogref = this.model.open(vendorcreatepage,{
      // fullscreen : "md"
      size : "xl"
    })
}



logUserType() {
  console.log(this.userType);
}
closeditdialog(){
  this.dialogref1.close()

}
closedialog() {
  this.dialogref.close()
}
  
formData = {
  name: '',
  mobile: '',
  email: '',
  address: '',
  state: '',
  pincode: '',
  panNo: '',
  gstNo: ''
};

create_supplier() {
  alert();
  

  console.log('Form Data:', this.formData, this.userType);
  // var login_clinic_id = localStorage.getItem("login_clinic_id");

  // console.log("login_clinic_id",login_clinic_id);
  



  this.LocalStoreService.create_supplier(this.formData, this.userType, this.login_clinic_id).subscribe(data => {
    console.log("registered data: ", data);
    // window.location.reload();
    this.dialogref.close()
  })
}

get_supplier() {

  this.LocalStoreService.get_supplier().subscribe(
    data => {
      console.log('Supplier Data:', data);


      this.suppliers = data.data;  // Assuming the response has a 'data' field
      console.log('Supplier List:', this.suppliers);
    }
  )
  }




Editvendorpopup(Editvendorpage, vendorid) {
  this.vendorid = vendorid
  console.log("for data verify",this.vendorid)
  this.LocalStoreService.getvendor_byid(this.vendorid).subscribe(data => {
  this.editvendorsdata = data.data;
  console.log("this is for checking",this.editvendorsdata)
});

this.dialogref1 = this.model.open(Editvendorpage,{
  size : "xl"
  });
  }

  editvendorsdatas(vendorid, editvendorsdata) {
    this.datafor = editvendorsdata;
    // editvendorsdata.forEach(data => {
    console.log("data send to backend:",this.datafor)
    this.LocalStoreService.editvendor_byid(vendorid,editvendorsdata).subscribe(data => {
    // });
    })
  }    
  

}