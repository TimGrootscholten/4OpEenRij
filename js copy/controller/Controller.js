import {Quiz} from "../model/Quiz.js"
import {QuizView} from "../view/QuizView.js"

export class Controller {
    constructor() {
        this.quiz = new Quiz();

        this.quizView = new QuizView(this.quiz);

        // Koppel de handlers aan de buttons
        this.quizView.bindNextQuestionButton(this.handleNextQuestion);
        this.quizView.bindPreviousQuestionButton(this.handlePreviousQuestion);
        this.quizView.bindChoiceButton(this.handleChoice);
        this.quizView.bindSubmitButton(this.handleSubmit);
        this.quizView.bindChoiceButton

        // Display eerste vraag
        this.quiz._commit();
    }

    handleNextQuestion = () => {
        this.quiz.setNextQuestion();
    };

    handlePreviousQuestion = () => {
        this.quiz.setPreviousQuestion();
    };

    handleChoice = (id) => {
        this.quiz.setGivenAnswer(id)
    };

    handleSubmit = () => {
        this.quizView.showResult();
    };
}
