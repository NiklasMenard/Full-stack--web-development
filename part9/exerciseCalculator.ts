interface WorkOutResults {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const exerciseCalculator = (args: Array <number> ) : WorkOutResults => {
    const workOutWeek = args
    const target = 2;
    const rating = 2;

    const result = {
        periodLength: workOutWeek.length,
        trainingDays: workOutWeek.reduce((total,x) => (x==0 ? total+1 : total), 0),
        target: target,
        rating: rating,
        success: target > rating,
        ratingDescription: 'not too bad but could be better',
        average: workOutWeek.reduce((sum, el) => sum + el, 0) / workOutWeek.length,
    }

    return result
}
