import { LyricsMakerPage } from './app.po';

describe('lyrics-maker App', () => {
  let page: LyricsMakerPage;

  beforeEach(() => {
    page = new LyricsMakerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
