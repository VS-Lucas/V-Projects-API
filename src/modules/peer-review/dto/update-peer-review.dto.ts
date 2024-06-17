export class PeerReviewUpdateDTO {

    id: number; 

    evaluatorId: number; 

    evaluatedId: number; 

    cycleId: number; 

    meanGrade: number; 

    PeerReviewScores: {

        id: number; 

        assessmentId: number; 

        behavior: number; 

        tecniques: number; 

        toImprove: string; 

        toPraise: string; 

    }

}