import { SystemDataInstance } from "../data/system";

export default class GameController {
  static newGame() {
    SystemDataInstance.clear();

    SystemDataInstance.createSystem(10);
  }
}