Date.prototype.startOfMonth = function () {
  this.setDate(1);

  return this;
};

Date.prototype.isSameMonth = function (other) {
  return (
    other &&
    this.getMonth() === other.getMonth() &&
    this.getFullYear() === other.getFullYear()
  );
};

Date.prototype.isSameDay = function (other) {
  return (
    other &&
    this.getMonth() === other.getMonth() &&
    this.getFullYear() === other.getFullYear() &&
    this.getDate() === other.getDate()
  );
};

Date.prototype.isBetween = function (a, b) {
  return (this.getTime() >= a.getTime() && this.getTime() <= b.getTime()) || (
    this.getTime() >= b.getTime() && this.getTime() <= a.getTime()
  );
};

Date.prototype.startOfWeek = function () {
  this.setDate(this.getDate() - this.getDay());

  return this;
};

Date.prototype.addDays = function (amount) {
  this.setDate(this.getDate() + amount);

  return this;
};

Date.prototype.addMonths = function (amount) {
  this.setMonth(this.getMonth() + amount);

  return this;
};

Date.prototype.clone = function () {
  return new Date(this.getTime());
};

Date.prototype.isLessThan = function(other){
  return this.getTime() < other.getTime();
}

Date.prototype.isGreaterThan = function(other){
  return this.getTime() > other.getTime();
}

Date.prototype.formatDate = function () {
  return (
    this
      .getDate()
      .toString()
      .padStart(2, "0") +
    "/" +
    (this.getMonth() + 1).toString().padStart(2, "0") +
    "/" +
    this.getFullYear()
  );
};