var Plan = function(sex, goal, calories, protein, carbohydrates, fat) {
  this.sex           = sex; // 'M' or 'F'
  this.goal          = goal; // 'Recomposition', 'Fat Loss', 'Muscle Gain'
  this.calories      = calories; // kcal/lb
  this.protein       = protein; // g/lb
  this.carbohydrates = carbohydrates; // g/lb
  this.fat           = fat; // g/lb
}

var plans = [
  //                                      4 cal/g         4 cal/g       9 cal/g
  //       sex, goal,            kCal/lb, protein (g/lb), carbs (g/lb), fat (g/lb)
  new Plan('M', 'Recomposition', 12.75,   1.15,           1.25,         0.35),
  new Plan('M', 'Fat Loss',      11.43,   1.25,           1.00,         0.27),
  new Plan('M', 'Muscle Gain',   16.90,   1.10,           2.00,         0.50),
  new Plan('F', 'Recomposition', 12.62,   1.10,           1.20,         0.38),
  new Plan('F', 'Fat Loss',      11.35,   1.15,           0.90,         0.35),
  new Plan('F', 'Muscle Gain',   14.90,   1.00,           1.60,         0.50)
]

var Client = function(weight, sex) {
  this.weight  = weight; // in lbs
  this.sex     = sex; // 'M' or 'F'
  this.plan    = null; // see Plan
  this.plans   = plans;
  this.setPlan = function(goal) {
    this.plans.find(function(_plan) {
      if ((this.sex == _plan.sex) && (goal == _plan.goal)) {
        return this.plan = _plan
      }
    }, this)
  };
  this.calories = function() {
    if (this.plan) {
      return Math.round(this.plan.calories * this.weight);
    }
  };
  this.protein  = function() {
    if (this.plan) {
      return Math.round(this.plan.protein * this.weight);
    }
  };
  this.carbohydrates = function() {
    if (this.plan) {
      return Math.round(this.plan.carbohydrates * this.weight);
    }
  };
  this.fat = function() {
    if (this.plan) {
      return Math.round(this.plan.fat * this.weight);
    }
  };
}

var calc = function() {
  var weight = document.getElementById('weight').value;
  var sex = document.getElementById('sex').value;
  var planName = document.getElementById('planName').value;
  var c = new Client(weight, sex);
  c.setPlan(planName);
  document.getElementById('calcCalories').innerHTML = c.calories();
  document.getElementById('calcProtein').innerHTML = c.protein();
  document.getElementById('calcCarbohydrates').innerHTML = c.carbohydrates();
  document.getElementById('calcFat').innerHTML = c.fat();
};
