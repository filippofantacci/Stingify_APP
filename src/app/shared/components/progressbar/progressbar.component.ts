import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.scss'],
})
export class ProgressbarComponent implements OnInit {

  @Input() progressbarOption: ProgressbarOption;
  public sum: number = 0;
  constructor() { }

  ngOnInit() {
    this.progressbarOption?.sections.forEach(section => {
      this.sum += section.value;
    });
  }

  public getPercentage(section: ProgressbarSection): number {
    return section.value ? Math.round((section.value / this.sum) * 100) : 0;

  }
}

export class ProgressbarOption {
  sections: ProgressbarSection[];
  showPercentage: boolean;
  showLabels: boolean;
}

export class ProgressbarSection {
  label: string;
  value: number;
  color: string;
}