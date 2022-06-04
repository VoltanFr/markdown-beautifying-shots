//Resources:
//- https://github.com/showdownjs/showdown/blob/master/docs/event_system.md
//- https://github.com/showdownjs/showdown/issues/518
//- https://github.com/showdownjs/showdown/issues/908

function convertMarkdown(src) {
    var converter = new showdown.Converter({ tables: true, extensions: [] });
    converter.setOption('openLinksInNewWindow', 'true');
    converter.setOption('simplifiedAutoLink', 'true');
    converter.setOption('simpleLineBreaks', 'true');
    converter.setOption('noHeaderId', 'true');
    converter.setOption('extensions', 'replaceHeader');
    return converter.makeHtml(src);
}

function valueWithThousandSeparators(number)  // number is a string 
{
    var value = Number(number);
    if (value == NaN) // We could decide not to convert a number < 2100 since we can suspect it is a year
        return null;
    return value.toLocaleString().replace(" ", "&nbsp;");
}

function insertThousandSeparatorsWhenStartOfInput(wholeMatch, number) {
    var value = valueWithThousandSeparators(number);
    if (value == null || value == 0)
        return wholeMatch;
    return value;
}

function insertThousandSeparatorsWhenBlankBefore(wholeMatch, blank, number) {
    var value = valueWithThousandSeparators(number);
    if (value == null || value == 0)
        return wholeMatch;
    return blank + value;
}

function replaceSpaceWithNbsp(wholeMatch, space, symbol) {
    return "&nbsp;" + symbol;
}

function beautifyTextForFrench(src) {
    // This is specific for French
    // We must not modify text:
    //  - in an URL (which we want to support as '<>' and '[]()')
    //  - in a quote with backslashes
    //  - probably in some sorts of block quotes (to be clarified)
    // Embedded HTML is to be considered. Did not dig, but I suspect there will be problems.
    // Right now we just take care not to replace in hyperlinks, based on the fact that an hyperlink can not contain a space

    let result = src;

    // Insert thousand separators
    result = result.replace(/(\s)(\d+)/g, insertThousandSeparatorsWhenBlankBefore);
    result = result.replace(/^(\d+)/g, insertThousandSeparatorsWhenStartOfInput);

    // White space before punctuation becomes nbsp
    result = result.replace(/( )(\?|!|;|:)/g, replaceSpaceWithNbsp);

    //result = result.replace(/\s\?/g, '&nbsp;?');
    //result = result.replace(/\s!/g, '&nbsp;!');
    //result = result.replace(/\s;/g, '&nbsp;;');
    //result = result.replace(/\s:/g, '&nbsp;:');

    return result;
}


function buttonClicked() {
    const inputTextArea = document.getElementById('inputTextArea');
    const inputText = inputTextArea.value;

    var beautified = beautifyTextForFrench(inputText);
    var output = convertMarkdown(beautified);

    const renderedDiv = document.getElementById('renderedDiv');
    renderedDiv.innerHTML = output;
}
