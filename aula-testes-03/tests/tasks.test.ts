import calculator from "calculator";

describe("Calculator functions", () => {
    it("returns 3 for the sum of 2 and 1", () => {
        // Chamar a função que queremos testar com os paremetros
        const resultado = calculator.sum(2, 1);
        // Nesse cenário esperamos o resultado 3     
        expect(resultado).toEqual(3);
    });

    it("returns 4 for the multiplication of 2 and 2", () => {
        const resultado = calculator.mul(2, 2);
        expect(resultado).toEqual(4)
    })

    it("returns 2 for the sub of 4 and 2", () => {
        const resultado = calculator.sub(4, 2)
        expect(resultado).toEqual(2)
    })

    it("returns 5 for the div of 10 by 2", () => {
        const resultado = calculator.div(10, 2)
        expect(resultado).toEqual(5)
    })
});