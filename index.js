const visit = require("unist-util-visit");

module.exports = (options) =>
{
	return tree =>
	{
		visit(tree, "inlineCode", node =>
		{
			if (node.value.startsWith("image"))
			{
				// Get groups from match.
				const groups = node.value.match(/image (.*?) decorative (.*?) alt(.*?) placement(.*?) end/);

				// When the markdown has been incorrectly formatted, render an error.
				if (groups == null)
				{
					node.type = "html";
					node.value = `<p><span style="color: red; font-weight: bold;">remark-a11y-image Error:</span> The markdown is not correctly formatted.</p>`;
					return;
				}

				// Extract groups.
				const image = groups[1].trim();
				const decorative = groups[2].trim() == "true" ? true : false;
				let alt = groups[3].trim();
				const placement  = groups[4].trim();

				// When an image has not been provided, render an error.
				if (image.length == 0)
				{
					node.type = "html";
					node.value = `<p><span style="color: red; font-weight: bold;">remark-a11y-image Error:</span> You must specify an image.</p>`;
					return;
				}

				// When it's a decorative image, assign presentation role and clear alt.
				let role = "image";
				if (decorative)
				{
					role = "presentation";
					alt = "";
				}

				// When it's not a decorative image and the alt is empty, render an error.
				if (!decorative && alt.length == 0)
				{
					node.type = "html";
					node.value = `<p><span style="color: red; font-weight: bold;">remark-a11y-image Error:</span> When an image is marked as decorative, you must specify an alternative description.</p>`;
					return;
				}

				// Figure out how to align the image.
				let css = "";
				if (options != undefined)
				{
					css = options.cssClassToCenterImage;
					if (placement == "Left") css = options.cssClassToLeftAlignImage;
					if (placement == "Right") css = options.cssClassToRightAlignImage;
				}

				// Update the node.
				node.type = "html";
				node.value = `<div class="${css}"><img src="${image}" role="${role}" alt="${alt}"></div>`;
			}
		});
	};
};
