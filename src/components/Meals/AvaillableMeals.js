import React, { useState, useEffect, useCallback } from "react";
import Card from "../UI/Card";
import Spinner from "../UI/Spinner";
import styles from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvaillableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, sethttpError] = useState(null);

  const fetchMealsHandler = useCallback(async () => {
    try {
      const response = await fetch(
        "https://http-requests-app-9f745-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      const loadedMeals = [];
      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }

      setMeals(loadedMeals);
    } catch (error) {
      setIsLoading(false);
      sethttpError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMealsHandler();
  }, [fetchMealsHandler]);
  let content = isLoading ? (
    <Spinner />
  ) : (
    <Card>
      <ul>
        {meals.map((meal) => (
          <MealItem key={meal.id} meal={meal} id={meal.id} />
        ))}
      </ul>
    </Card>
  );
  if (httpError)
    content = <p style={{ textAlign: "center", color: "red" }}>{httpError}</p>;
  return <section className={styles.meals}>{content}</section>;
};

export default AvaillableMeals;
