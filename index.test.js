// Import remark to parse markdown.
const remark = require("remark");

// Import our plugin.
const plugin = require("./index");

// Setup shared data.
const processorWithCss = remark().use(plugin, {
    cssClassToCenterImage: "w-full flex justify-center",
    cssClassToLeftAlignImage: "w-full flex justify-start",
    cssClassToRightAlignImage: "w-full flex justify-end",
});

const processorWithoutCss = remark().use(plugin);

const base = [
    "to-replace",
    "Contrary to popular belief, Lorem Ipsum is not simply random text.",
    "It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
    "Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
    "Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC.",
    "This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.",
    "",
].join("\n");

// Tests.
test("error is rendered, when markdown is incorrectly formatted", () =>
{
    let inputString = base.replace("to-replace", "\`image http://image.com/test.png decorative false placement Left end\`");
    let expectedResult = base.replace("to-replace", `<p><span style="color: red; font-weight: bold;">remark-a11y-image Error:</span> The markdown is not correctly formatted.</p>`);

    const result = processorWithCss.processSync(inputString).toString();
    expect(result).toBe(expectedResult);
});

test("error is rendered, when image isn't specified", () =>
{
    let inputString = base.replace("to-replace", "\`image  decorative false alt This is the alt placement Left end\`");
    let expectedResult = base.replace("to-replace", `<p><span style="color: red; font-weight: bold;">remark-a11y-image Error:</span> You must specify an image.</p>`);

    const result = processorWithCss.processSync(inputString).toString();
    expect(result).toBe(expectedResult);
});

test("css classes are applied, when the css options have been provided", () =>
{
    let inputString = base.replace("to-replace", "\`image http://image.com/test.png decorative false alt This is the alt placement Left end\`");
    let expectedResult = base.replace("to-replace", `<div class="w-full flex justify-start"><img src="http://image.com/test.png" role="img" alt="This is the alt"></div>`);

    const result = processorWithCss.processSync(inputString).toString();
    expect(result).toBe(expectedResult);
});

test("css classes aren't applied, when the css options haven't been provided", () =>
{
    let inputString = base.replace("to-replace", "\`image http://image.com/test.png decorative false alt This is the alt placement Left end\`");
    let expectedResult = base.replace("to-replace", `<div class=""><img src="http://image.com/test.png" role="img" alt="This is the alt"></div>`);

    const result = processorWithoutCss.processSync(inputString).toString();
    expect(result).toBe(expectedResult);
});

test("alt is empty, when image is decorative", () =>
{
    let inputString = base.replace("to-replace", "\`image http://image.com/test.png decorative true alt This is the alt placement Left end\`");
    let expectedResult = base.replace("to-replace", `<div class="w-full flex justify-start"><img src="http://image.com/test.png" role="presentation" alt=""></div>`);

    const result = processorWithCss.processSync(inputString).toString();
    expect(result).toBe(expectedResult);
});

test("alt is applied, when image isn't decorative", () =>
{
    let inputString = base.replace("to-replace", "\`image http://image.com/test.png decorative false alt This is the alt placement Left end\`");
    let expectedResult = base.replace("to-replace", `<div class="w-full flex justify-start"><img src="http://image.com/test.png" role="img" alt="This is the alt"></div>`);

    const result = processorWithCss.processSync(inputString).toString();
    expect(result).toBe(expectedResult);
});

test("error is rendered, when image is not decorative and alt is empty", () =>
{
    let inputString = base.replace("to-replace", "\`image http://image.com/test.png decorative false alt placement Left end\`");
    let expectedResult = base.replace("to-replace", `<p><span style="color: red; font-weight: bold;">remark-a11y-image Error:</span> When an image isn't marked as decorative, you must specify an alternative description.</p>`);

    const result = processorWithCss.processSync(inputString).toString();
    expect(result).toBe(expectedResult);
});

test("image is centered", () =>
{
    let inputString = base.replace("to-replace", "\`image http://image.com/test.png decorative false alt This is the alt placement Center end\`");
    let expectedResult = base.replace("to-replace", `<div class="w-full flex justify-center"><img src="http://image.com/test.png" role="img" alt="This is the alt"></div>`);

    const result = processorWithCss.processSync(inputString).toString();
    expect(result).toBe(expectedResult);
});

test("image is left aligned", () =>
{
    let inputString = base.replace("to-replace", "\`image http://image.com/test.png decorative false alt This is the alt placement Left end\`");
    let expectedResult = base.replace("to-replace", `<div class="w-full flex justify-start"><img src="http://image.com/test.png" role="img" alt="This is the alt"></div>`);

    const result = processorWithCss.processSync(inputString).toString();
    expect(result).toBe(expectedResult);
});

test("image is right aligned", () =>
{
    let inputString = base.replace("to-replace", "\`image http://image.com/test.png decorative false alt This is the alt placement Right end\`");
    let expectedResult = base.replace("to-replace", `<div class="w-full flex justify-end"><img src="http://image.com/test.png" role="img" alt="This is the alt"></div>`);

    const result = processorWithCss.processSync(inputString).toString();
    expect(result).toBe(expectedResult);
});