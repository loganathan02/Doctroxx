import { Component, OnInit } from '@angular/core';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';
// import { log } from 'util';

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
selectedSupplierEmail: any;
selectedSupplierMobile: any;
selectedSupplierName: any;
  


  toggleTable() {
    this.showButton = false; // Hide button, show table
    console.log('Selected Date:', this.selectedDate);

  }

  onSupplierChange() {
  console.log('Selected Supplier ID:', this.selectedSupplierId);
  this.LocalStoreService.get_selected_supplier(this.selectedSupplierId).subscribe(data => {
    data
    this.selectedSupplierEmail = data.data.email
    this.selectedSupplierMobile = data.data.mobile
    this.selectedSupplierName = data.data.name

  })
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
        console.log("selectedSupplierName",this.selectedSupplierName);
        

        
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
  this.LocalStoreService.addProduct(this.productList, this.amountBeforeTax,this.amountAfterTax,this.roundOffTotal,this.grandTotal,this.login_clinic_id,this.selectedSupplierId,amounts,this.selectedSupplierName,this.selectedSupplierMobile).subscribe(data => {
    console.log("product data: ", data);
    // window.location.reload();
  })
}


validateAndAddProduct() {
  let missingFields = [];

  if (!this.formData.brand) missingFields.push("Brand");
  if (!this.formData.category) missingFields.push("Category");
  if (!this.formData.proId) missingFields.push("Product ID");
  if (!this.formData.proName) missingFields.push("Product Name");
  if (!this.formData.genericName) missingFields.push("Generic Name");
  if (!this.formData.hsn) missingFields.push("HSN");
  if (!this.formData.mrp) missingFields.push("MRP");
  if (!this.formData.rate) missingFields.push("Rate");
  if (!this.formData.unit) missingFields.push("Unit");
  if (!this.formData.qty) missingFields.push("Quantity");
  if (!this.formData.gst) missingFields.push("GST");
  if (!this.formData.igst) missingFields.push("IGST");
  if (!this.formData.cgst) missingFields.push("CGST");
  if (!this.formData.sgst) missingFields.push("SGST");
  if (!this.formData.total) missingFields.push("Total");

  if (missingFields.length > 0) {
    alert("Please fill the following fields: \n" + missingFields.join(", "));
  } else {
    this.addProducttableview(); // Call the function to add product
  }
}


  
    removeProduct(product: any) {
      this.productList = this.productList.filter(p => p !== product);
    }
  


}
