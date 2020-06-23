import pkg from './package.json'

export default [
	{
		input: pkg.src,
		output: [
      // ES module build
			{ file: pkg.module, format: 'esm', strict: false },

      // commonjs build
			{ file: pkg.main,  format: 'cjs', strict: false },

      // browser-friendly build
			{ file: pkg.iife,  format: 'iife', strict: false, globals: { anylogger: 'anylogger', debug: 'debug' } },
		],
		external: [ 'anylogger', 'debug' ],
	}
];
