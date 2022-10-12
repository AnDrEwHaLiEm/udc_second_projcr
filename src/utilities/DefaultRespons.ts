import DefaultResponseInterface from './DefaultResponseInterface';

export default class DefaultRespons implements DefaultResponseInterface {
  public state: number;
  public text: string;
  constructor() {
    this.state = 200;
    this.text = 'Server is run';
  }
}
