import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-user-profile',
  templateUrl: './product-inventory.component.html',
  styleUrl: './product-inventory.component.scss',
  
})
export class UserProfileComponent implements OnInit {
  modelpopup: any;


  constructor(private dialogModal: NgbModal) { }

  ngOnInit() {
    
  }
  openproductpopup(productpage) {
    this.modelpopup = this.dialogModal.open(productpage, {
      size: 'xl',
    })
  }

  closedialog() {
    this.modelpopup.close()
  }

}
