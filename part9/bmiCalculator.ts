type Result = string;

const calculateBmi = (height: number, weight: number): Result => {
    if (weight / Math.pow(height/100, 2) <= 18.5) {
        return 'Underweight'
    } 
    if (weight / Math.pow(height/100, 2) <= 24.9) {
        return 'Normal weight'
    }
    if (weight / Math.pow(height/100, 2) <= 29.9) {
        return 'Overweight'
    }
    if (weight / Math.pow(height/100, 2) > 30) {
        return 'Obesity'
    }
}

const a: number = Number(process.argv[2])
const b: number = Number(process.argv[3])

console.log(calculateBmi(a, b))
