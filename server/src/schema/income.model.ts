import mongoose from "mongoose";

interface Income {
  userId: string;
  description: string;
  amount: number;
  type: string;
  date: Date;
  category: string;
  paymentMethod: string;
}

const incomeSchema = new mongoose.Schema<Income>(
  {
    userId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      default: "Income",
    },
    date: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const IncomeModel = mongoose.model<Income>("Income", incomeSchema);

export default IncomeModel;
