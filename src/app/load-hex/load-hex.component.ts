import { Component, OnInit,Input } from '@angular/core';
import { UiService } from '../services/ui.service';
import { QuestOSService } from '../services/quest-os.service';

@Component({
  selector: 'app-load-hex',
  templateUrl: './load-hex.component.html',
  styleUrls: ['./load-hex.component.scss']
})
export class LoadHexComponent implements OnInit {
  @Input() bootMessage = "";
  constructor( private q: QuestOSService, private ui: UiService) {
    this.q.os.onBootMessage().subscribe( (m) => {
      this.bootMessage = m;

    })

    this.ui.processingSub.subscribe( (data) => {
      if(data){console.log('Fetching amazing processing screen...'); } else{ console.log('Removing amazing processing screen...'); }
      this.isProcessing = data;
    }) }


  isProcessing = true;

  ngOnInit(): void {
    this.isProcessing = this.ui.getProcessingStatus();
  }

}
