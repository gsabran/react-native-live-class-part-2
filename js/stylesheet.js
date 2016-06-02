 /**
  * @flow
  */

import { StyleSheet, Platform } from 'react-native';

export default function create ( styles: Object ): { [ name: string ]: number } {
  const platformStyles = {};

  Object.keys( styles ).forEach( name => {
    let { ios, android, ...style } = { ...styles[ name ] };

    if ( ios && Platform.OS === 'ios' ) {
      style = { ...style, ...ios };
    } else if ( android && Platform.OS === 'android' ) {
      style = { ...style, ...android };
    }

    platformStyles[ name ] = style;
  });

  return StyleSheet.create( platformStyles );
}
