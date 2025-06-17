/**
 * Copyright(c) 2025 Alghanim Digital.
 *
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of Alghanim ("Confidential
 * Information"). You shall not disclose such Confidential Information and shall use it only in
 * accordance with the terms of the contract agreement you entered into with Alghanim.
 *
 * @author Janajith D
 */

import LoadingSpinner from "./LoadingSpinner";

export default function Loading() {
  return (
    <div>
      <div className="loading-container">
        <LoadingSpinner />
      </div>
    </div>
  );
}
