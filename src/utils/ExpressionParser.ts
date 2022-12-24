import * as math from "mathjs";

// The purpose of this class is to act as a wrapper to mathjs
// In case, if we want to change the library in future then
// we don't have to change all over the places instead we can
// just change it one file
export class ExpressParser {
  public evaluate: any = math.evaluate;
  public parse: math.ParseFunction = math.parse;
  public parser: () => math.Parser = math.parser;
}
