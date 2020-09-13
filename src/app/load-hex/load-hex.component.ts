import { Component, OnInit } from '@angular/core';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-load-hex',
  templateUrl: './load-hex.component.html',
  styleUrls: ['./load-hex.component.scss']
})
export class LoadHexComponent implements OnInit {

  constructor( private ui: UiService) {


    this.ui.processingSub.subscribe( (data) => {
      if(data){console.log('Fetching amazing processing screen...'); } else{ console.log('Removing amazing processing screen...'); }
      this.isProcessing = data;
    }) }


  isProcessing = true;

  ngOnInit(): void {
    this.isProcessing = this.ui.getProcessingStatus();
  }

}
