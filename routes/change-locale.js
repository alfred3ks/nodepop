const express = require('express');
const router = express.Router();

// GET /change-locale/[locale]
router.get('/:locale', (req, res, next) => {
  const locale = req.params.locale;
  // put a cookie with the new language
  res.cookie('nodepop-locale', locale, {
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
  });

  // we respond with a redirect to the same page it came from:
  // referer we see it given by the request when we go from one page to another we see it in the devtools
  res.redirect(req.get('referer'));
});

module.exports = router;
