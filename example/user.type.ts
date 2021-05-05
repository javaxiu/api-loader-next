/**
 * if index.html include mock.js file as this example does, 
 * field would support @mockjs xxx 
 * more usage could be found here http://mockjs.com/examples.html
*/

export interface User {
  /** @mockjs cname */
  name: string;
  gender: 'man' | 'female';
  color: Color;
  other: any;
  address: {
    /** @mockjs province */
    myProvince: string;
    /** @mockjs city */
    myCity: string;
  },
  /** @mockjs image(120x120) */
  header: string;
  child: User;
  /** @length 3 */
  computer: Computer[],
}

export interface Computer {
  /** @mockjs ip */
  ip: string
}

// @api-ignore
export interface something {
  name: string
}

export enum Color {
  BLACK = 'black',
  WHITE = 'white'
}