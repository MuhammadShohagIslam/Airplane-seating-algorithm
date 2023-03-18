class AirplaneSeatingController {
    constructor(seats, passengers = 0) {
        this.seats = this.createSeats(seats);
        this.remainingPassengers = passengers;
        this.assignedSeats = this.seats;
        this.nextSeatNumber = 1;
    }
    createSeats(input) {
        const maxColumns = Math.max(...input.map((arr) => arr[1]));
        let seats = [];
        for (let colI = 0; colI < maxColumns; colI++) {
            let block = [];

            input.forEach((arr) => {
                const row = arr[0];
                let col = arr[1];

                for (let i = 0; i < row; i++) {
                    if (col - colI > 0) {
                        block.push("seat");
                    } else {
                        block.push("empty");
                    }
                }
                block.push("aisle");
            });
            block = block.slice(0, -1);
            seats.push(block);
        }
        return seats;
    }

    get autoAssignedSeats() {
        this.assignAllSeats();
        return {
            seats: this.assignedSeats,
            remainingPassengers: this.remainingPassengers,
        };
    }

    assignAllSeats() {
        this.assignAisleSeats();
        this.assignWindowSeats();
        this.assignMiddleSeats();
    }

    assignAisleSeats() {
        let seats = [...this.seats];

        seats.forEach((row, rowI) => {
            row.forEach((seat, seatI) => {
                if (this.remainingPassengers < 1) {
                    return;
                }
                if (seatI > 0 && seatI < row.length) {
                    if (
                        seat === "seat" &&
                        (row[seatI - 1] === "aisle" ||
                            row[seatI + 1] === "aisle")
                    ) {
                        seats[rowI][seatI] = this.nextSeatNumber;
                        this.nextSeatNumber++;
                        this.remainingPassengers--;
                    }
                }
            });
        });
        this.assignedSeats = seats;
    }

    assignWindowSeats() {
        let seats = [...this.seats];
        seats.forEach((row, rowI) => {
            row.forEach((seat, seatI) => {
                if (this.remainingPassengers < 1) {
                    return;
                }
                if (
                    seat === "seat" &&
                    (seatI === 0 || seatI === row.length - 1)
                ) {
                    seats[rowI][seatI] = this.nextSeatNumber;
                    this.nextSeatNumber++;
                    this.remainingPassengers--;
                }
            });
        });
        this.assignedSeats = seats;
    }

    assignMiddleSeats() {
        let seats = [...this.seats];

        seats.forEach((row, rowI) => {
            row.forEach((seat, seatI) => {
                if (this.remainingPassengers < 1) {
                    return;
                }
                if (
                    seat === "seat" &&
                    !(
                        seatI === 0 ||
                        seatI === row.length - 1 ||
                        row[seatI - 1] === "aisle" ||
                        row[seatI + 1] === "aisle"
                    )
                ) {
                    seats[rowI][seatI] = this.nextSeatNumber;
                    this.nextSeatNumber++;
                    this.remainingPassengers--;
                }
            });
        });
        this.assignedSeats = seats;
    }
}

module.exports =  AirplaneSeatingController;
