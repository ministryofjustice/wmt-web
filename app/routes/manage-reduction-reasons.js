const authorisation = require('../authorisation')
const messages = require('../constants/messages')
const { APPLICATION_SUPPORT, SUPER_USER } = require('../constants/user-roles')
const Forbidden = require('../services/errors/authentication-error').Forbidden
const getReductionReasons = require('../services/data/get-reduction-reasons')
const getReductionReasonById = require('../services/data/get-reduction-reason-by-id')
const getReductionCategories = require('../services/data/get-reduction-categories')
const ReductionReason = require('../services/domain/reduction-reason')
const ValidationError = require('../services/errors/validation-error')
const updateReductionReason = require('../services/data/update-reduction-reason')
const insertReductionReason = require('../services/data/insert-reduction-reason')
const Link = require('../services/domain/link')
const canAddReasonRoles = [SUPER_USER]
const canEditReasonRoles = [SUPER_USER]

const manageTabTitle = {
  second: 'Manage Reduction Reasons',
  third: 'Admin'
}

const addTabTitle = {
  first: 'Add Reduction Reason',
  second: 'Manage Reduction Reasons',
  third: 'Admin'
}

const editTabTitle = {
  first: 'Edit Reduction Reason',
  second: 'Manage Reduction Reasons',
  third: 'Admin'
}

module.exports = function (get, post) {
  get('/manage-reduction-reasons', function (req, res, next) {
    try {
      authorisation.hasRole(req, [APPLICATION_SUPPORT, SUPER_USER])
    } catch (error) {
      if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED

        })
      }
    }

    const breadcrumbs = getBreadcrumbs('/manage-reduction-reasons')

    const success = req.query.success
    const successText = success ? 'The Reduction Reason was saved successfully!' : null

    return getReductionReasons(false).then(function (reasons) {
      const reductionReasons = formatReductionReasons(reasons)
      const enabledReductionReasons = reductionReasons.filter(enabledReduction => enabledReduction.isEnabled === true)
      const disabledReductionReasons = reductionReasons.filter(disabledReduction => disabledReduction.isEnabled === false)
      return res.render('manage-reduction-reasons', {
        enabledReductionReasons,
        disabledReductionReasons,
        breadcrumbs,
        title: 'Manage Reduction Reasons',
        successText,
        tabTitle: manageTabTitle,
        canAddReason: canAddReasonRoles.includes(req.user.user_role),
        canEditReason: canEditReasonRoles.includes(req.user.user_role),
        onAdmin: true

      })
    }).catch(function (error) {
      next(error)
    })
  })

  get('/add-reduction-reason', function (req, res, next) {
    try {
      authorisation.hasRole(req, canAddReasonRoles)
    } catch (error) {
      if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED

        })
      }
    }

    const breadcrumbs = getBreadcrumbs('/add-reduction-reason')

    return getReductionCategories().then(function (categories) {
      return res.render('add-reduction-reason', {
        categories,
        breadcrumbs,
        title: 'Add Reduction Reason',
        tabTitle: addTabTitle,
        onAdmin: true

      })
    }).catch(function (error) {
      next(error)
    })
  })

  get('/edit-reduction-reason', function (req, res, next) {
    try {
      authorisation.hasRole(req, canEditReasonRoles)
    } catch (error) {
      if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED

        })
      }
    }

    const breadcrumbs = getBreadcrumbs('/edit-reduction-reason')

    const id = req.query.id
    if (!id) {
      return res.redirect('/manage-reduction-reasons')
    }

    return getReductionReasonById(id).then(function (reason) {
      return getReductionCategories().then(function (categories) {
        return res.render('edit-reduction-reason', {
          reduction: reason,
          breadcrumbs,
          categories,
          title: 'Edit Reduction Reason',
          tabTitle: editTabTitle,
          onAdmin: true

        })
      })
    }).catch(function (error) {
      next(error)
    })
  })

  post('/add-reduction-reason', function (req, res, next) {
    try {
      authorisation.hasRole(req, [SUPER_USER, APPLICATION_SUPPORT])
    } catch (error) {
      if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED

        })
      }
    }

    const breadcrumbs = getBreadcrumbs('/add-reduction-reason')
    let reductionReason

    return getReductionCategories().then(function (categories) {
      try {
        reductionReason = new ReductionReason(
          req.body.reductionName,
          req.body.reductionShortName,
          req.body.category,
          req.body.allowancePercentage,
          req.body.maxAllowancePercentage,
          req.body.monthsToExpiry,
          req.body.isEnabled
        )
      } catch (error) {
        if (error instanceof ValidationError) {
          return res.status(400).render('add-reduction-reason', {
            reduction: {
              reason: req.body.reductionName,
              reasonShortName: req.body.reductionShortName,
              allowancePercentage: req.body.allowancePercentage,
              maxAllowancePercentage: req.body.maxAllowancePercentage,
              monthsToExpiry: req.body.monthsToExpiry,
              isEnabled: getIsEnabled(req.body.isEnabled),
              category: findCategoryById(categories, req.body.category)
            },
            title: 'Add Reduction Reason',
            tabTitle: addTabTitle,
            breadcrumbs,
            errors: error.validationErrors,
            categories,
            onAdmin: true

          })
        } else {
          next(error)
        }
      }
      return insertReductionReason(reductionReason)
        .then(function () {
          return res.redirect(302, '/manage-reduction-reasons?success=true')
        })
    }).catch(function (error) {
      next(error)
    })
  })

  post('/edit-reduction-reason', function (req, res, next) {
    try {
      authorisation.hasRole(req, canEditReasonRoles)
    } catch (error) {
      if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED

        })
      }
    }

    const breadcrumbs = getBreadcrumbs('/edit-reduction-reason')
    // var id = req.query.id
    let reductionReason

    return getReductionCategories().then(function (categories) {
      try {
        reductionReason = new ReductionReason(
          req.body.reductionName,
          req.body.reductionShortName,
          req.body.category,
          req.body.allowancePercentage,
          req.body.maxAllowancePercentage,
          req.body.monthsToExpiry,
          req.body.isEnabled
        )
      } catch (error) {
        if (error instanceof ValidationError) {
          return res.status(400).render('edit-reduction-reason', {
            reduction: {
              id: req.body.reasonId,
              reason: req.body.reductionName,
              reasonShortName: req.body.reductionShortName,
              allowancePercentage: req.body.allowancePercentage,
              maxAllowancePercentage: req.body.maxAllowancePercentage,
              monthsToExpiry: req.body.monthsToExpiry,
              isEnabled: getIsEnabled(req.body.isEnabled),
              category: findCategoryById(categories, req.body.category)
            },
            breadcrumbs,
            title: 'Edit Reduction Reason',
            tabTitle: editTabTitle,
            errors: error.validationErrors,
            categories,
            onAdmin: true

          })
        } else {
          next(error)
        }
      }
      return updateReductionReason(req.body.reasonId, reductionReason)
        .then(function () {
          return res.redirect(302, '/manage-reduction-reasons?success=true')
        })
    }).catch(function (error) {
      next(error)
    })
  })
}

const formatReductionReasons = function (reasons) {
  if (reasons) {
    if (reasons.length > 0) {
      reasons.forEach(function (reason) {
        if (!reason.monthsToExpiry) {
          reason.monthsToExpiry = 'N/A'
        }
      })
    }
  }
  return reasons
}

const findCategoryById = function (categories, id) {
  let categoryName = null
  if (id) {
    categoryName = categories.filter(category => category.id === parseInt(id))[0].category
  }
  return categoryName
}

const getIsEnabled = function (isEnabled) {
  if (isEnabled === null || isEnabled === undefined || isEnabled === '') {
    return isEnabled
  } else {
    return isEnabled === 'true'
  }
}

const getBreadcrumbs = function (currentRoute) {
  let breadcrumbs
  switch (currentRoute) {
    case '/manage-reduction-reasons':
      breadcrumbs = [
        new Link('Manage Reduction Reasons', '/manage-reduction-reasons'),
        new Link('Admin', '/admin')
      ]
      break
    case '/edit-reduction-reason':
      breadcrumbs = [
        new Link('Edit Reduction Reason', '/edit-reduction-reason'),
        new Link('Manage Reduction Reasons', '/manage-reduction-reasons'),
        new Link('Admin', '/admin')
      ]
      break
    case '/add-reduction-reason':
      breadcrumbs = [
        new Link('Add Reduction Reason', '/add-reduction-reason'),
        new Link('Manage Reduction Reasons', '/manage-reduction-reasons'),
        new Link('Admin', '/admin')
      ]
      break
  }
  return breadcrumbs
}
