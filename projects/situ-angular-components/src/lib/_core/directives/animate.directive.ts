import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {
  AnimationReferenceMetadata,
  AnimationBuilder,
  AnimationFactory,
  AnimationPlayer,
  style,
  animate,
  keyframes,
} from '@angular/animations';

@Directive({
  selector: '[situAnimate]',
})
export class AnimateDirective implements OnInit, OnDestroy {
  @Input() animateOnLoad: Boolean;
  @Input() animation: AnimationReferenceMetadata;
  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll() {
    this.animate();
  }

  private animating: boolean;
  private observer: MutationObserver;
  private player: AnimationPlayer;
  private defaults: any = {
    offset: 0,
    resetOnLeave: false,
  };

  constructor(
    private element: ElementRef,
    private animationBuilder: AnimationBuilder
  ) {}

  ngOnInit(): void {
    this.initialize();
    this.observe();
    this.animate();
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }

  private observe(): void {
    let self = this;
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach(function (mutation) {
        //console.log(mutation);
        self.animate();
      });
    });
    var config = { attributes: true, childList: true, characterData: true };
    this.observer.observe(this.element.nativeElement, config);
  }

  private initialize(): void {
    let animation: AnimationFactory;

    if (this.animation !== null && this.animation !== undefined) {
      animation = this.animationBuilder.build(this.animation);
    } else {
      animation = this.animationBuilder.build([
        animate(
          '1000ms 0ms',
          keyframes([
            style({
              visibility: 'visible',
              opacity: 0,
              transform: 'translate3d(0, 100px, 0)',
              easing: 'ease',
              offset: 0,
            }),
            style({
              opacity: 1,
              transform: 'translate3d(0, 0, 0)',
              easing: 'ease',
              offset: 1,
            }),
          ])
        ),
      ]);
    }

    this.player = animation.create(this.element.nativeElement);
    this.player.init();
  }

  private animate(): void {
    const inView = this.isInViewport() || this.animateOnLoad;

    if (!inView && this.defaults.resetOnLeave) this.animating = false;
    if (!inView || this.animating) return;

    this.player.play();
    this.animating = true;
  }

  private isInViewport(): boolean {
    const bounding = this.element.nativeElement.getBoundingClientRect();

    let top =
      bounding.top -
      (window.innerHeight || document.documentElement.clientHeight);
    let bottom = bounding.top + bounding.height + this.defaults.offset;

    return top < 0 && bottom > 0;
  }
}
