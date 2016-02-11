![Travis CI Build Status](https://travis-ci.org/Automattic/_s.svg?branch=master)

OOMPERIUM based on _s
===


My ultra-minimal CSS might make me look like theme tartare but that means less stuff to get in your way when you're designing your awesome theme. Here are some of the other more interesting things you'll find here:

* A just right amount of lean, well-commented, modern, HTML5 templates.
* A helpful 404 template.
* A sample custom header implementation in `inc/custom-header.php` that can be activated by uncommenting one line in `functions.php` and adding the code snippet found in the comments of `inc/custom-header.php` to your `header.php` template.
* Custom template tags in `inc/template-tags.php` that keep your templates clean and neat and prevent code duplication.
* Some small tweaks in `inc/extras.php` that can improve your theming experience.
* A script at `js/navigation.js` that makes your menu a toggled dropdown on small screens (like your phone), ready for CSS artistry. It's enqueued in `functions.php`.
* 2 sample CSS layouts in `layouts/` for a sidebar on either side of your content.
* Smartly organized starter CSS in `style.css` that will help you to quickly get your design off the ground.
* Licensed under GPLv2 or later. :) Use it to make something cool.

Getting Started
---------------

If you want to keep it simple, head over to http://underscores.me and generate your `_s` based theme from there. You just input the name of the theme you want to create, click the "Generate" button, and you get your ready-to-awesomize starter theme.

If you want to set things up manually, download `_s` from GitHub. The first thing you want to do is copy the `_s` directory and change the name to something else (like, say, `megatherium`), and then you'll need to do a five-step find and replace on the name in all the templates.

1. Search for `'oomperium'` (inside single quotations) to capture the text domain.
2. Search for `oomperium_` to capture all the function names.
3. Search for `Text Domain: oomperium` in style.css.
*. Search for `Theme Name: oomperium` in style.css.
4. Search for <code>&nbsp;oomperium</code> (with a space before it) to capture DocBlocks.
5. Search for `oomperium-` to capture prefixed handles.

OR

* Search for: `'oomperium'` and replace with: `'oomperidev'`
* Search for: `oomperium_` and replace with: `oomperidev_`
* Search for: `Text Domain: oomperium` and replace with: `Text Domain: oomperidev` in style.css.
* Search for `Theme Name: oomperium` and replace with `Theme Name: oomperidev in style.css.
* Search for: <code>&nbsp;oomperium/code> and replace with: <code>&nbsp;oomperidev</code>
* Search for: `oomperium-` and replace with: `oomperidev-`

But setting these values back to oomperium should not be needed due to git branching

Then, update the stylesheet header in `style.css` and the links in `footer.php` with your own information. Next, update or delete this readme.

Now you're ready to go! The next step is easy to say, but harder to do: make an awesome WordPress theme. :)

Good luck!
