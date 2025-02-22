import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const RulesPage = () => {
  return (
    <div className="min-h-screen text-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-stone-200 text-center">
            Ranking System
          </h1>
          <p className="text-2xl text-stone-400 text-center">
            Transparent scoring at every contribution.
          </p>
        </div>

        {/* GitHub Section */}
        <section className="space-y-6">
          <h2 className="text-2xl text-stone-300 font-semibold">
            GitHub Scoring
          </h2>

          <div className="relative shadow-[0_0_50px_theme(colors.stone.500/40%)] bg-stone-700 rounded-lg min-h-[250px] w-full mx-auto overflow-hidden">
            {/* <div */}
            {/*   className="absolute inset-0 bg-cover bg-center bg-no-repeat" */}
            {/*   style={{ */}
            {/*     backgroundImage: "url('/images/aura.jpg')", */}
            {/*     backgroundPosition: "center", */}
            {/*   }} */}
            {/* /> */}
            <div className="absolute shadow-[0_0_50px_theme(colors.stone.700/40%)] inset-4 rounded-lg bg-black/40 backdrop-blur-2xl to-transparent" />

            {/* Content inside blurred container */}
            <div className="relative z-10 p-8">
              <h3 className="text-2xl font-semibold mb-4 text-stone-250">
                Pull Request Evaluation
              </h3>
              <p className="text-gray-200 mb-6">
                We analyze your 5 most recent pull requests out of which we only
                calcualte the score of the pr's which has been merged as anyone
                can create a pr in any repository and we want to keep it equal
                for everyone by calculating the score of their recent merged pr,
                Read Below For More Detailed Information
              </p>

              <div className="space-y-6">
                {/* Metrics Grid */}
                <div className="grid md:grid-cols-1 gap-6">
                  {/* LOC Metric */}
                  <div className="space-y-2">
                    <h4 className="text-lime-300 text-xl font-medium">
                      Lines of Code Impact
                    </h4>
                    <ul className="text-gray-200 space-y-2">
                      <li className="flex items-start space-x-2">
                        <span className="mt-2 block w-1 h-1 rounded-full bg-gray-400"></span>
                        <span className="flex-1">
                          The Score is Calculated based on the no of lines of
                          additions and deletions which is normalized against
                          project size. If anyone is making a very small amount
                          of changes we penalizes them as that pr may not create
                          a big impact, we know that sometimes small changes
                          actually fixes the big issues so we have created a
                          different structure which will automatically calculate
                          the score of the pr according to the issue the pr is
                          fixing.
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="mt-2 block w-1 h-1 rounded-full bg-gray-400"></span>
                        <span className="flex-1">
                          We Reward users for making changes across multiple
                          files but penalize unnecessarily large changes in too
                          many files as it can get difficult for the maintainer
                          to review them in a single PR.
                        </span>
                      </li>
                    </ul>
                  </div>
                  {/* Complexity Metric */}
                  <div className="space-y-2">
                    <h4 className="text-lime-300 text-xl font-medium">
                      Code Complexity
                    </h4>
                    <div className="text-gray-200">
                      <div className="flex items-start space-x-2">
                        <span className="mt-2 block w-1 h-1 rounded-full bg-gray-400"></span>
                        <p className="flex-1">
                          We Use Static Code tools to anyalyze the complexity of
                          the PR
                        </p>
                      </div>
                      <ul className="ml-8 space-y-2 mt-2">
                        <li className="flex items-start space-x-2">
                          <span className="mt-2 block w-1 h-1 rounded-full bg-gray-400"></span>
                          <span className="flex-1">
                            Cyclomatic Complexity: Measure the complexity of the
                            code changes.
                          </span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="mt-2 block w-1 h-1 rounded-full bg-gray-400"></span>
                          <span className="flex-1">
                            Function Length: Shorter, well structured functions
                            score higher.
                          </span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="mt-2 block w-1 h-1 rounded-full bg-gray-400"></span>
                          <span className="flex-1">
                            Code Smells: Your points are deducted for common bad
                            practices (e.g., unused variables, deep nesting).
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>{" "}
                  {/* Test Coverage */}
                  <div className="space-y-2">
                    <h4 className="text-lime-300 text-xl font-medium">
                      Test Coverage
                    </h4>
                    <p className="text-gray-200">
                      Points awarded for comprehensive test coverage and test
                      improvements (like adding playwright tests or selenium ui
                      test etc...) as these are very important for big projects.
                    </p>
                  </div>
                  {/* Commit Quality */}
                  <div className="space-y-2">
                    <h4 className="text-lime-300 text-xl font-medium">
                      Commit Quality
                    </h4>
                    <div className="text-gray-200">
                      <div className="flex items-start space-x-2">
                        <span className="mt-2 block w-1 h-1 rounded-full bg-gray-400"></span>
                        <p className="flex-1">
                          We Evaluate the commit history in the PR for:
                        </p>
                      </div>
                      <ul className="ml-8 space-y-2 mt-2">
                        <li className="flex items-start space-x-2">
                          <span className="mt-2 block w-1 h-1 rounded-full bg-gray-400"></span>
                          <span className="flex-1">
                            Clear and descriptive commit messages.
                          </span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="mt-2 block w-1 h-1 rounded-full bg-gray-400"></span>
                          <span className="flex-1">
                            Logical commit structure (e.g., avoid too many "Fix
                            typo" commits).
                          </span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="mt-2 block w-1 h-1 rounded-full bg-gray-400"></span>
                          <span className="flex-1">
                            Fewer force-pushes and rebases as these shows u
                            don't have enough knowledge about how git commits
                            works.
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/*FeedBack Review*/}
                  <div className="space-y-2">
                    <h4 className="text-lime-300 text-xl font-medium">
                      Review FeedBack
                    </h4>
                    <div className="text-gray-200">
                      <ul className="ml-8 space-y-2 mt-2">
                        <li className="flex items-start space-x-2">
                          <span className="mt-2 block w-1 h-1 rounded-full bg-gray-400"></span>
                          <span className="flex-1">
                            We Check if the PR received comments or changes
                            requested during the review
                          </span>
                        </li>
                      </ul>
                      <ul className="ml-8 space-y-2 mt-2">
                        <li className="flex items-start space-x-2">
                          <span className="mt-2 block w-1 h-1 rounded-full bg-gray-400"></span>
                          <span className="flex-1">
                            Deduct points for unresolved comments but reward PRs
                            with constructive discussions.
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* Code Impact */}
                  <div className="space-y-2">
                    <h4 className="text-lime-300 text-xl font-medium">
                      Overall Impact
                    </h4>
                    <p className="text-gray-200">
                      Higher scores for critical fixes, major features, and
                      widely used code.We Normalize the scores for all users to
                      a consistent scale (e.g., 0 to 100) to make rankings
                      meaningful. Below is the Formula of how we calculate the
                      score for Github
                    </p>
                  </div>
                </div>

                {/* Scoring Formula */}
                <div className="bg-black/30 p-4 rounded-lg backdrop-blur-sm">
                  <h4 className="text-sm font-medium text-gray-200 mb-2">
                    Scoring Formula
                  </h4>
                  <code className="text-sm text-lime-400">
                    final_score = (loc_score * 0.4) + (complexity_score * 0.3) +
                    (test_score * 0.2) + (review_score * 0.1)
                  </code>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LeetCode Section */}
        <section className="space-y-6">
          <h2 className="text-2xl text-stone-300 font-semibold">
            LeetCode Scoring
          </h2>
          <div className="relative shadow-[0_0_50px_theme(colors.stone.500/40%)] bg-stone-700 rounded-lg min-h-[250px] w-full mx-auto overflow-hidden">
            <div className="absolute shadow-[0_0_50px_theme(colors.stone.700/40%)] inset-4 rounded-lg bg-black/40 backdrop-blur-2xl to-transparent" />
            <div className="relative z-10 p-8">
              <h3 className="text-2xl font-semibold mb-4 text-stone-250">
                Problem Solving Evaluation
              </h3>
              <p className="text-gray-200 mb-6">
                LeetCode scoring follows the official LeetCode rating system,
                evaluating your problem-solving skills across different
                difficulty levels.
              </p>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Problem Difficulty */}
                  <div className="space-y-2">
                    <h4 className="text-lime-300 text-xl font-medium">
                      Problem Difficulty
                    </h4>
                    <p className="text-gray-200">
                      Points awarded based on problem complexity: Easy (3),
                      Medium (4) and Hard (5) problems.
                    </p>
                  </div>

                  {/* Consistency */}
                  <div className="space-y-2">
                    <h4 className="text-lime-300 text-xl font-medium">
                      Submission Consistency
                    </h4>
                    <p className="text-gray-200">
                      Tracks regular practice and improvement in data structures
                      skills.
                    </p>
                  </div>
                </div>
                <div className="bg-black/30 p-4 rounded-lg backdrop-blur-sm">
                  <h4 className="text-sm font-medium text-gray-200 mb-2">
                    Scoring Formula
                  </h4>
                  <code className="text-sm text-lime-400">
                    leetcode_score = (difficulty_points + quality_bonus) *
                    consistency_multiplier
                  </code>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final Ranking */}
        <section className="space-y-6">
          <h2 className="text-2xl text-stone-300 font-semibold">
            Combined Ranking
          </h2>
          <div className="relative shadow-[0_0_50px_theme(colors.stone.500/40%)] bg-stone-700 rounded-lg min-h-[250px] w-full mx-auto overflow-hidden">
            <div className="absolute shadow-[0_0_50px_theme(colors.stone.700/40%)] inset-4 rounded-lg bg-black/40 backdrop-blur-2xl to-transparent" />
            <div className="relative z-10 p-8">
              <h3 className="text-2xl font-semibold mb-4 text-stone-250">
                Overall Developer Score
              </h3>
              <p className="text-gray-200 mb-6">
                Your final rank will be a combnation of your GitHub
                contributions and LeetCode questions to provide a comprehensive
                assessment.
              </p>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="text-lime-300 text-xl font-medium">
                      GitHub Weight (60%)
                    </h4>
                    <p className="text-gray-200">
                      Emphasizes real world development experience and project
                      contributions.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-lime-300 text-xl font-medium">
                      LeetCode Weight (40%)
                    </h4>
                    <p className="text-gray-200">
                      Reflects algorithmic problem solving skills and technical
                      expertise.
                    </p>
                  </div>
                </div>
                <div className="bg-black/30 p-4 rounded-lg backdrop-blur-sm">
                  <h4 className="text-sm font-medium text-gray-200 mb-2">
                    Final Ranking Formula
                  </h4>
                  <code className="text-sm text-lime-400">
                    final_rank = (github_score * 0.6) + (leetcode_score * 0.4)
                  </code>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RulesPage;
