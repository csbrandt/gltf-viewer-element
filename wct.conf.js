
module.exports = {
    verbose: true,
    plugins: {
        "web-component-tester-istanbul": {

            dir: "./coverage",

            reporters: ["text-summary", "lcov"],

            include: [
                "scripts/*.js"
            ]

        }
    }
};