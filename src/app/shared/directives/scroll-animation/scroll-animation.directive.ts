import { Directive, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appScrollAnimation]',
})
export class ScrollAnimationDirective implements AfterViewInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined' && window.IntersectionObserver) {
      this.initObserver();
    }
  }

  private initObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // إضافة كلاس show عند ظهور العنصر
            this.renderer.addClass(this.el.nativeElement, 'show');
          }
        });
      },
      {
        threshold: 0.5,  // تنشيط الأنيميشن عندما يظهر العنصر بنسبة 50%
      }
    );

    observer.observe(this.el.nativeElement);
  }
}
