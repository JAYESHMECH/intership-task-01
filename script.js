
const form = document.getElementById("emiForm");
const result = document.getElementById("result");
const emiOutput = document.getElementById("emi");
const details = document.getElementById("details");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const P = Number(
    document.getElementById("principal").value
  );
  const annualRate = Number(
    document.getElementById("rate").value
  );
  const years = Number(
    document.getElementById("tenure").value
  );

  if (
    !Number.isFinite(P) ||
    !Number.isFinite(annualRate) ||
    !Number.isFinite(years) ||
    P <= 0 || annualRate < 0 ||
    years <= 0 || !Number.isInteger(years)
  ) {
    alert("Please enter valid loan details.");
    return;
  }

  const R = annualRate / 12 / 100;
  const N = years * 12;

  let EMI;

  if (R === 0) {
    EMI = P / N;
  } else {
    const power = Math.pow(1 + R, N);
    EMI = P * R * power / (power - 1);
  }

  const totalPayment = EMI * N;
  const totalInterest = totalPayment - P;

  const money = amount =>
    amount.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2
    });

  emiOutput.textContent = money(EMI);

  details.innerHTML =
    "Loan Amount: " + money(P) + "<br>" +
    "Loan Tenure: " + N + " months<br>" +
    "Total Interest: " + money(totalInterest) +
    "<br>Total Payment: " + money(totalPayment);
});

form.addEventListener("reset", function() {
  emiOutput.textContent = "₹0.00";
  details.textContent = "";
});
