<?php

class Timsort {
		
	private function calc_min_run(int $length) : int {
			$r = 0;
			while ($length >= 32) {
					$r |= $length & 1;
					$length >>= 1;
			}
			return $length + $r;
	}

	private function insertion_sort(array $arr, int $left, int $right, string $key) : array {
		
			for ($i = $left + 1; $i < $right + 1; $i++) {
					$j = $i;
					while ($j > $left && $arr[$j][$key] < $arr[$j - 1][$key]) {
							$temp = $arr[$j];
							$arr[$j] = $arr[$j - 1];
							$arr[$j - 1] = $temp;
							$j--;
					}
			}

			return $arr;
	}

	private function merge(array $arr, int $left, int $middle, int $right) : array {
		
			$len1 = $middle - $left + 1;
			$len2 = $right - $middle;
			$leftArr = array_fill(0, $len1, 0);
			$rightArr = array_fill(0, $len2, 0);

			for ($i = 0; $i < $len1; $i++) {
					$leftArr[$i] = $arr[$left + $i];
			}
			for ($i = 0; $i < $len2; $i++) {
					$rightArr[$i] = $arr[$middle + 1 + $i];
			}

			$i = 0;
			$j = 0;
			$k = $left;

			while ($i < $len1 && $j < $len2) {
					if ($leftArr[$i] <= $rightArr[$j]) {
							$arr[$k] = $leftArr[$i];
							$i++;
					} else {
							$arr[$k] = $rightArr[$j];
							$j++;
					}
					$k++;
			}

			while ($i < $len1) {
					$arr[$k] = $leftArr[$i];
					$k++;
					$i++;
			}

			while ($j < $len2) {
					$arr[$k] = $rightArr[$j];
					$k++;
					$j++;
			}

			return $arr;
	}

	public function sort(array $arr, string $key) : array {
		
		$si = sizeof($arr);
		$min_run = $this->calc_min_run($si);
		for ($start = 0; $start < $si; $start += $min_run) {
				$end = min($start + $min_run - 1, $si - 1);
				$arr = $this->insertion_sort($arr, $start, $end, $key);
		}
		$size = $min_run;
		
		while ($size < $si) {
				for ($left = 0; $left < $si; $left += 2 * $size) {
						$middle = min($si - 1, $left + $size - 1);
						$right = min($left + 2 * $size - 1, $si - 1);

						if ($middle < $right) {
								$arr = $this->merge($arr, $left, $middle, $right);
						}
				}
				$size *= 2;
		}
		return $arr;
		
	}

}
