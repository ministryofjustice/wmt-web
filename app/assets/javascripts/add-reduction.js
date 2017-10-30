// Set current year dynamically
  var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31]
  var currentYear = new Date().getFullYear()
  document.getElementById('start-year').setAttribute('min', currentYear)

  var chosenReduction

  var setHoursAndEndDateToReadOnly = function () {
    var chosenReductionIndex = document.getElementById("select-box").selectedIndex
    
    if(chosenReductionIndex){
      // Dummy option in dropdown means array is offset by one.
      chosenReduction = refData[chosenReductionIndex - 1]
        
      if (chosenReduction.allowancePercentage !== null) {
        document.getElementById('hours').setAttribute('readonly', true)
      } else {
        document.getElementById('hours').removeAttribute('readonly')
      }
        
      if (chosenReduction.maxAllowancePercentage !== null) {
        document.getElementById('hours').setAttribute('max', chosenReduction.maxAllowanceHours)
      } else {
        document.getElementById('hours').removeAttribute('max')
      }

      if (chosenReduction.monthsToExpiry !== null) {
        document.getElementById('end-day').setAttribute('readonly', true)
        document.getElementById('end-month').setAttribute('readonly', true)
        document.getElementById('end-year').setAttribute('readonly', true)
      } else {
        document.getElementById('end-day').removeAttribute('readonly')
        document.getElementById('end-month').removeAttribute('readonly')
        document.getElementById('end-year').removeAttribute('readonly')
      }    
    }
  }

  var populateHours = function () {

    var value = ''

    var chosenReductionIndex = document.getElementById("select-box").selectedIndex

    if(chosenReductionIndex){
      // Dummy option in dropdown means array is offset by one.
      chosenReduction = refData[chosenReductionIndex - 1]
    
      if (chosenReduction.allowancePercentage !== null) {
        document.getElementById('hours').value = chosenReduction.allowanceHours
        document.getElementById('hours').setAttribute('readonly', true)
      } else {
        document.getElementById('hours').value = value
        document.getElementById('hours').removeAttribute('readonly')
      }
    
      if (chosenReduction.maxAllowancePercentage !== null) {
        document.getElementById('hours').setAttribute('max', chosenReduction.maxAllowanceHours)
      } else {
        document.getElementById('hours').removeAttribute('max')
      }
    }
  }

  var calculateExpiry = function () {    
    var chosenReductionIndex = document.getElementById("select-box").selectedIndex
    
    if(chosenReductionIndex){
      // Dummy option in dropdown means array is offset by one
      chosenReduction = refData[chosenReductionIndex - 1]

      var startDay = document.getElementById("start-day").value      
      var startMonth = document.getElementById("start-month").value
      var startYear = document.getElementById("start-year").value

      var readonly = false
      var endDate = null
      var startDate

      if (chosenReduction.monthsToExpiry !== null) {
        var startDate = new Date(Number(document.getElementById("start-year").value),
                                 Number(document.getElementById("start-month").value) - 1,
                                 Number(document.getElementById("start-day").value))
        
        if(startDate.getYear() % 4 === 0){
          daysInMonth[1] = 29 
        } else {
          daysInMonth[2] = 28
        }

        if (Number(startDay) > 0 && Number(startDay) < daysInMonth[startDate.getMonth()] + 1
          && Number(startYear) > 1900 
          && Number(startMonth) > 0 && Number(startMonth) < 13) {
          
          var endDate = new Date(startDate.setMonth(startDate.getMonth() + chosenReduction.monthsToExpiry))
          readonly = true
        }
      }
      
      if (readonly){
        document.getElementById('end-day').setAttribute('readonly', readonly)
        document.getElementById('end-month').setAttribute('readonly', readonly)
        document.getElementById('end-year').setAttribute('readonly', readonly)
      } else {
        document.getElementById('end-day').removeAttribute('readonly')
        document.getElementById('end-month').removeAttribute('readonly')
        document.getElementById('end-year').removeAttribute('readonly')
      }
      if(endDate !== null) {
        document.getElementById('end-day').value = endDate.getDate()
        document.getElementById('end-month').value = endDate.getMonth() + 1
        document.getElementById('end-year').value = endDate.getFullYear()
      } else {
        document.getElementById('end-day').value = ''
        document.getElementById('end-month').value = ''
        document.getElementById('end-year').value = ''
      }
    }
  }

  window.onload = function () {
    setHoursAndEndDateToReadOnly()
  }