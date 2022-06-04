# Markdown beautifying shots

This is a playground for attempts at improving Markdown before display for the user. Current implementation only supports French rules.

Here are some examples of objectives:

- Replace `<space>?` with `<nbsp;>?` (in French, a question mark is preceeded with a space, but you don't want the line to break). And similar for other punctuations as needed.
  >Eg `Showdown est super !` would be converted as `Showdown est super&nbsp;!`
- Add thousand separators in numbers.
  >Eg `1234567` would be converted as `1,234,567` (or narrow no-break space as thousand separator in French).

Of course we want to do that only in _text_. We don't want to alter citations or hyperlinks.

The file of interest is [index.js](/wwwroot/js/index.js). You probably don't want to compile the project; but in case you want to, just open the sln file with Visual Studio (I use version 2022).
