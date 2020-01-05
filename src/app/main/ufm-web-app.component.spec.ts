import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UFMWebAppComponent } from './ufm-web-app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        UFMWebAppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(UFMWebAppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ufifamods'`, () => {
    const fixture = TestBed.createComponent(UFMWebAppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('ufifamods');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(UFMWebAppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('ufifamods app is running!');
  });
});
