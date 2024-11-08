import React from 'react';

export default function RootLayout(props) {
  return (
    <html>
      <body>{props.children}</body>
    </html>
  );
}
