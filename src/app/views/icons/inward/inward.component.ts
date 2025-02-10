import { Component, OnInit } from '@angular/core';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';

@Component({
  selector: 'app-inward',
  // standalone: true,
  // imports: [],
  templateUrl: './inward.component.html',
  styleUrl: './inward.component.scss'
})
export class InwardComponent implements OnInit{

  ngOnInit(): void { 
    this.clinic_all_supplier();
    this.login_clinic_id = localStorage.getItem("login_clinic_id");
    console.log("Supplier_id",this.clinic_all_supplier());

    
    

  }
 constructor(
   
    private LocalStoreService: LocalStoreService,

  ) {


  }
  showButton: boolean = true;
  selectedSupplierId: any = '';
  selectedDate: any = '';
  invoiceNumber: any = '';
  productList: any[] = [];
  amountBeforeTax: string = '';
  amountAfterTax: string = '';
  roundOffTotal: string = '';
  grandTotal: string = '';
  login_clinic_id: any;
transaction_type: any ="inbound";
transaction_reason:any ="purchase";
  


  toggleTable() {
    this.showButton = false; // Hide button, show table
    console.log('Selected Date:', this.selectedDate);
    console.log('Invoice Number:', this.invoiceNumber,this.selectedSupplierId);

  }
  



  clinic_all_supplier() {

    this.LocalStoreService.get_clinic_all_supplier().subscribe(
      data => {
        console.log('Supplier all Data:', data);
        this.clinic_all_supplier = data.data;
        console.log(this.clinic_all_supplier);
        
      }
    )
    }




    formData: any = {
      brand: '',
      category: '',
      proId: '',
      proName: '',
      genericName: '',
      hsn: '',
      mrp: '',
      rate: '',
      unit:'',
      qty:'',
      gst: '',
      isgt: '',
      cgst: '',
      sgst: '',
      total: ''
    };

    addProducttableview() {
      // Add new row before the last input row
      this.productList.unshift({ ...this.formData });
      
  
      // Reset form fields
      this.formData = {
        brand: '',
        category: '',
        proId: '',
        proName: '',
        genericName: '',
        hsn: '',
        mrp: '',
        rate: '',
        unit:'',
        qty:'',
        gst: '',
        isgt: '',
        cgst: '',
        sgst: '',
        total: ''
      };
      console.log("all products",this.productList);
      
    }
    addProduct(){
      

        console.log("prodicts", this.productList);
        console.log("Number of products:", this.productList.length);

        
      const amounts = [{ 
        amountBeforeTax: this.amountBeforeTax,
        amountAfterTax: this.amountAfterTax,
        roundOffTotal: this.roundOffTotal,
        grandTotal: this.grandTotal,
        transaction_type: this.transaction_type,
        transaction_reason: this.transaction_reason,
        line_items: this.productList.length

    }];
    
    console.log("amounts in objects",amounts);
    
      console.log("Amount Before Tax:", this.amountBeforeTax);
    console.log("Amount After Tax:", this.amountAfterTax);
    console.log("Round Off Total:", this.roundOffTotal);
    console.log("Grand Total:", this.grandTotal);
  this.LocalStoreService.addProduct(this.productList, this.amountBeforeTax,this.amountAfterTax,this.roundOffTotal,this.grandTotal,this.login_clinic_id,this.selectedSupplierId,amounts).subscribe(data => {
    console.log("product data: ", data);
    // window.location.reload();
  })
}


get_selected_supplier(selectedSupplierId) {

  this.LocalStoreService.get_selected_supplier(selectedSupplierId).subscribe(

    // data => {
    //   console.log('Supplier Data:', data);


    // }
  )
  }
   
  
    removeProduct(product: any) {
      this.productList = this.productList.filter(p => p !== product);
    }
  


}
