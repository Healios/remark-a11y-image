export default [
    {
        input: "index.js",
        external: ["unist-util-visit",],
        output: [
            { file: "dist/index.js", format: "cjs", },
            { file: "gridsome/index.js", format: "cjs", },
        ],
    },
];