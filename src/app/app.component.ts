import { Component, Renderer2 } from "@angular/core";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  selectedElements = [];
  attempt = 0;
  start;

  tiles = [
    [
      { faceValue: 1, paired: false, img:'https://images.app.goo.gl/XskqzS6PG23xtGkEA' },
      { faceValue: 4, paired: false },
      { faceValue: 2, paired: false },
      { faceValue: 3, paired: false }
    ],
    [
      { faceValue: 12, paired: false, img:"https://images.app.goo.gl/XskqzS6PG23xtGkEA" },
      { faceValue: 9, paired: false },
      { faceValue: 11, paired: false },
      { faceValue: 10, paired: false }
    ],
    [
      { faceValue: 5, paired: false },
      { faceValue: 6, paired: false },
      { faceValue: 7, paired: false },
      { faceValue: 8, paired: false }
    ]
  ];

  constructor(private renderer: Renderer2) {}

  flip(i, j, card) {
    if (this.attempt === 0) this.start = Date.now();
    this.attempt++;

    if (this.tiles[i][j].paired) return;

    if (this.selectedElements.length === 0) {
      this.selectedElements.push(this.tiles[i][j], card);
      this.renderer.addClass(card, "flipped");
      return;
    }

    if (this.tiles[i][j].faceValue === this.selectedElements[0].faceValue) {
      this.renderer.removeClass(this.selectedElements[1], "flipped");
      this.selectedElements = [];
      return;
    }

    if (
      this.tiles[i][j].faceValue + this.selectedElements[0].faceValue ===
      this.tiles.length * this.tiles[0].length + 1
    ) {
      this.renderer.addClass(card, "flipped");
      this.tiles[i][j].paired = true;
      this.selectedElements[0].paired = true;
      this.selectedElements = [];

      if (this.tiles.every(row => row.every(tile => tile.paired))) {
        alert(
          "congrats " +
            this.attempt +
            " " +
            (Date.now() - this.start) / 1000 +
            "s"
        );
      }
    } else {
      this.renderer.removeClass(this.selectedElements[1], "flipped");
      this.selectedElements = [];
    }
  }
}
