import replace from 'rollup-plugin-re'
import pkg from './package.json'

export default [
	{
		input: pkg.src,
		output: [
      // commonjs build
			{ file: pkg.main,  format: 'cjs', strict: false },
		],
		external: [ 'anylogger', 'debug' ],
	},
	{
		input: pkg.src,
		output: [
      // browser-friendly build
			{ file: pkg.iife,  format: 'iife', strict: false, globals: { anylogger: 'anylogger', debug: 'debug' } },
		],
		external: [ 'anylogger', 'debug' ],
		plugins: [
			// remove import bloat from iife bundle
			replace({
				patterns: [
					{
						match: /anylogger-debug/,
						test: 'import anylogger from \'anylogger\'',
						replace: '',
					}, {
						match: /anylogger-debug/,
						test: 'import debug from \'debug\'',
						replace: '',
					},
				]
			})
		],
	},
];
