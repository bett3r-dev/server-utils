// const tsconfig = require( './tsconfig.json' );
module.exports = function ( w ) {
  process.env.NODE_ENV = 'test';
  return {
    compilers: {
      '**/*.ts?(x)': w.compilers.typeScript({ isolatedModules: true, module:'commonjs'/* , useStandardDefaults: true */ })
    },
    files: [
      'src/{,**}/*.ts',
      'src/{,**}/*.js',
      { pattern: 'src/{,**}/*.test.ts', ignore: true },
      { pattern: 'wallaby.conf.js', ignore: true, instrument:false },
    ],
    filesWithNoCoverageCalculated:[
      'src/fixtures/{,**}/*.ts',
      'src/fixtures/{,**}/*.js',
    ],
    tests: [
      'src/{,**}/*.test.ts',
    ],
    env: {
      type: 'node'
    },
    runMode: 'onsave',
    trace: true,
    hints: {
      ignoreCoverage: /istanbul ignore next/
    },
  };
};
