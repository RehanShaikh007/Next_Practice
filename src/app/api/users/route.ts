import connectDB from "@/lib/mongodb";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const { type, email, name, password } = body;

    if (type === "signup") {
      const exists = await User.findOne({ email });

      if (exists) {
        return NextResponse.json(
          { error: "User already exists!" },
          { status: 400 }
        );
      }

      const user = new User({ name, email, password });

      await user.save();

      return NextResponse.json(
        { message: "User Signup Successful!", user },
        { status: 201 }
      );
    }

    if (type === "login") {
      const user = await User.findOne({ email, password });

      if (!user) {
        return NextResponse.json(
          { error: "Invalid Credentials!" },
          { status: 401 }
        );
      }

      return NextResponse.json(
        { message: "Login Successful!", user },
        { status: 200 }
      );
    }

    return NextResponse.json({ error: "Invalid Request!" }, { status: 400 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("API ERROR:", err.message);
      return NextResponse.json(
        { error: "Internal Server Error", details: err.message },
        { status: 500 }
      );
    }

    console.error("API ERROR:", err);
    return NextResponse.json(
      { error: "Internal Server Error"},
      { status: 500 }
    );
  }
}
