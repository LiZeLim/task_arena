'use client'

import React, { FormEvent } from 'react'
import { addWorkout } from '@/app/api/backend/db';

export const AddWorkout = ({ params }: { params : {id: string}}) => {
    async function handleAddWorkoutSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const selection = formData.get("radio-10") as string;
        console.log(params.id, selection);

        await addWorkout(params.id, selection);
    }

  return (
      <div className="card card-compact bg-base-100">
          <div className="card-body">
              <div className="card-title">Add Workout</div>
              <form className="card-body" onSubmit={handleAddWorkoutSubmit}>
                  <div className="form-control">
                      <label className="label cursor-pointer">
                          <span className="label-text">Push</span>
                          <input
                              type="radio"
                              name="radio-10"
                              className="radio checked:bg-red-500"
                              value={"Push"}
                              defaultChecked
                          />
                      </label>
                  </div>
                  <div className="form-control">
                      <label className="label cursor-pointer">
                          <span className="label-text">Pull</span>
                          <input
                              type="radio"
                              name="radio-10"
                              className="radio checked:bg-blue-500"
                              value={"Pull"}
                          />
                      </label>
                  </div>
                  <div className="form-control">
                      <label className="label cursor-pointer">
                          <span className="label-text">Legs</span>
                          <input
                              type="radio"
                              name="radio-10"
                              className="radio checked:bg-green-500"
                              value={"Legs"}
                          />
                      </label>
                  </div>
                  <div className="form-control mt-6">
                      <button className="btn btn-primary">Add</button>
                  </div>
              </form>
          </div>
      </div>
  );
}
